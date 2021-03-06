---
title: "jq: group, unique, average"
# author: ""
type: ""
date: "2019-06-09T13:26:15-05:00"
subtitle: ""
image: ""
tags: ["jq", "bash", "ctf"]
draft: false
---

Recently I've been running through [picoCTF 2018](https://2018game.picoctf.com/) and saw this problem that can be solved with some cool stuff from [jq](https://stedolan.github.io/jq/) (a handy JSON processor for the command line).

Question: What is the number of unique destination IPs a file is sent to, on average?  
<!--more-->
A shortened version of the provided data, `incidents.json`, is below.
```JSON
{
  "tickets": [
    {
      "ticket_id": 0,
      "timestamp": "2017/06/10 07:50:14",
      "file_hash": "fb0abe9b2a37e234",
      "src_ip": "131.90.8.180",
      "dst_ip": "104.97.128.21"
    },
    {
      "ticket_id": 1,
      "timestamp": "2017/06/11 05:19:56",
      "file_hash": "f2d8740404ff1d55",
      "src_ip": "187.100.149.54",
      "dst_ip": "33.29.174.118"
    },
      ...
    {
      "ticket_id": 9,
      "timestamp": "2015/12/10 17:28:48",
      "file_hash": "cafc9c5ec7ebc133",
      "src_ip": "210.205.230.140",
      "dst_ip": "99.31.12.3"
    }
  ]
}
```

### solution
> Pipe it up, pipe it up, pipe it up, pipe it up  
> Pipe it up, pipe it up, pipe it up, pipe it up  
> - Migos, [Pipe it up](https://www.youtube.com/watch?v=8g2KKGgK-0w)

In jq you just create an array of the number of unique destination IPs for each file hash, then calculate the average:
```bash
$ cat incidents.json \
  | jq '[
          .tickets
          | group_by(.file_hash)[]
          | unique_by(.dst_ip)
          | length
        ]
        | add / length'
```

jq accepts a JSON document as input, so first we `cat` our JSON data into jq. In jq, arrays and individual elements can be piped into other functions.

### group_by

The first step is pretty straight forward. We select `tickets` and group the objects the objects by their `.file_hash` attribute, giving us this:

```bash
$ cat incidents.json \
  | jq '[
          .tickets
          | group_by(.file_hash)[]
        ]'
```

output:
```JSON
[
  [
    {
      "ticket_id": 3,
      "timestamp": "2017/08/14 18:02:17",
      "file_hash": "1a03d0a86d991e91",
      "src_ip": "122.231.138.129",
      "dst_ip": "88.148.199.124"
    }
  ],
  [
    {
      "ticket_id": 5,
      "timestamp": "2015/08/17 20:48:14",
      "file_hash": "43e10d21eb3f5dc8",
      "src_ip": "210.205.230.140",
      "dst_ip": "50.225.199.154"
    },
    {
      "ticket_id": 7,
      "timestamp": "2015/03/18 22:37:20",
      "file_hash": "43e10d21eb3f5dc8",
      "src_ip": "122.231.138.129",
      "dst_ip": "209.104.88.119"
    }
  ],
  ...
  [
    {
      "ticket_id": 0,
      "timestamp": "2017/06/10 07:50:14",
      "file_hash": "fb0abe9b2a37e234",
      "src_ip": "131.90.8.180",
      "dst_ip": "104.97.128.21"
    },
    {
      "ticket_id": 8,
      "timestamp": "2015/07/08 17:11:17",
      "file_hash": "fb0abe9b2a37e234",
      "src_ip": "93.124.108.240",
      "dst_ip": "33.29.174.118"
    }
  ]
]
```

### unique_by

Next we find the objects with unique destination ips within each of these groups. I'm not sure how jq decides which object to select from a group that share a value, but it doesn't matter for our purposes.

```bash
$ cat incidents.json \
  | jq '[
          .tickets
          | group_by(.file_hash)[]
          | unique_by(.dst_ip)
        ]'
```
output:
```JSON
[
  [
    {
      "ticket_id": 3,
      "timestamp": "2017/08/14 18:02:17",
      "file_hash": "1a03d0a86d991e91",
      "src_ip": "122.231.138.129",
      "dst_ip": "88.148.199.124"
    }
  ],
  [
    {
      "ticket_id": 7,
      "timestamp": "2015/03/18 22:37:20",
      "file_hash": "43e10d21eb3f5dc8",
      "src_ip": "122.231.138.129",
      "dst_ip": "209.104.88.119"
    },
    {
      "ticket_id": 5,
      "timestamp": "2015/08/17 20:48:14",
      "file_hash": "43e10d21eb3f5dc8",
      "src_ip": "210.205.230.140",
      "dst_ip": "50.225.199.154"
    }
  ],
	...
  [
    {
      "ticket_id": 0,
      "timestamp": "2017/06/10 07:50:14",
      "file_hash": "fb0abe9b2a37e234",
      "src_ip": "131.90.8.180",
      "dst_ip": "104.97.128.21"
    },
    {
      "ticket_id": 8,
      "timestamp": "2015/07/08 17:11:17",
      "file_hash": "fb0abe9b2a37e234",
      "src_ip": "93.124.108.240",
      "dst_ip": "33.29.174.118"
    }
  ]
]
```

### length

Then we get the number of objects in each group

```bash
$ cat incidents.json \
  | jq '[
          .tickets
          | group_by(.file_hash)[]
          | unique_by(.dst_ip)
          | length
        ]'
```
output:
```JSON
[
  1,
  2,
  1,
  1,
  1,
  2,
  2
]
```

### add / length

Then you can just pipe that array into `add / length` to calculate the average for the array

```bash
$ cat incidents.json \
  | jq '[
          .tickets
          | group_by(.file_hash)[]
          | unique_by(.dst_ip)
          | length
        ]
        | add / length'
```
output:
```JSON
1.4285714285714286
```