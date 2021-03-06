---
title: "aws lambda: local server"
author: ""
type: ""
date: "2020-07-11T13:26:35-06:00"
subtitle: ""
image: ""
tags: ["aws", "lambda", "bash", "python"]
draft: false
---

I've been messing around with a project which uses netlify and lambda (it's free and static sites are hawt). I basically have one main lambda function which handles api requests built in golang. It's pretty awesome how easy netlify lets you build and deploy, but I wanted to a nice local setup for building and testing my api server. I think aws has its [own tooling](https://aws.amazon.com/serverless/sam/) for this, but I didn't really want to start fooling with it, so I came up with this.

First, use a docker container [docker-lambda](https://github.com/lambci/docker-lambda) to actually "run" the lambda. This is an awesome container, but you have to use the lambda API for interacting with the service. That's no good because our frontend shouldn't care about the lambda API, and it should just use the API gateway netlify uses for the functions.

To fix this, I created a small python proxy takes requests, converts them into API Gateway requests, forwards it to our docker container with the lambda, then converts the API Gateway response into a normal HTTP response. I _really_ struggled to get the python request handler to do all of the things I wanted, but eventually I got it working.

Here's the full script I use to run the lambda as an HTTP API locally. Since I'm using golang I use the `go1.x` tag for the container and provide the path to the executable. Also, I ended up wrapping the python starting process in a loop b/c it was taking a while for the port to become available again after killing and restarting the script.

```bash
#! /bin/bash
# Starts a a mock lambda server allowing you to make requests
set -e

# build my go executable
make build

docker rm -f lambda_service 2>&1 >/dev/null || true
docker run -d --rm \
    --name lambda_service \
    -p 9001:9001 \
    -e DOCKER_LAMBDA_STAY_OPEN=1 \
    --env-file .env \
    -v "$PWD":/var/task:ro,delegated \
    # Change tag and path to executable as needed
    lambci/lambda:go1.x ./bin/functions/jockey

# start a proxy server that handles translating to and from APIGateway request/responses
python3 -c '
from http.server import BaseHTTPRequestHandler
from http.client import parse_headers
import socketserver
from urllib.request import urlopen
from json import dumps, loads
import os
import time

PORT = 8000
LAMBDA_PORT = int(os.getenv("LAMBDA_PORT", "9001"))

class Proxy(BaseHTTPRequestHandler):
    # change the function name as needed (my functions name is jockey)
    lambda_endpoint = f"http://localhost:{LAMBDA_PORT}/2015-03-31/functions/jockey/invocations"
    def proxy_it(self):
        content_length = self.headers["Content-Length"]
        data_string = ""
        if content_length:
            data_string = self.rfile.read(int(content_length)).decode()
        constructed_request = {
            "path": self.path,
            "httpMethod": self.command,
            "body": data_string,
            "headers": {k: self.headers[k] for k in self.headers.keys()}
        }
        print("Sending Request: ", constructed_request)
        response = urlopen(self.lambda_endpoint, dumps(constructed_request).encode())

        body = response.read().decode()
        http_response = loads(body)
        print("\nGot Response: ", http_response)

        headers = http_response.get("headers", {})
        body = http_response["body"] if http_response.get("body") else ""
        status_code = http_response.get("statusCode", 500)
        self.send_response(status_code)
        for header, value in headers.items():
            self.send_header(header, value)
        self.end_headers()
        self.wfile.write(bytes(body, "utf-8"))

    def do_GET(self):
        self.proxy_it()

    def do_POST(self):
        self.proxy_it()

    def do_OPTIONS(self):
        self.proxy_it()

started = False
while not started:
    try:
        with socketserver.TCPServer(("", PORT), Proxy) as httpd:
            started = True
            print(f"Proxying from port {PORT} to {LAMBDA_PORT}")
            httpd.serve_forever()
    except:
        print("Port still occupied, waiting...")
        time.sleep(5)
'
```

### Final thoughts
This could probably be improved but it's worked so far for my toy project. One significant improvement to this process would be to have the docker container auto rebuild the function whenever it changes, but I've yet to add that.