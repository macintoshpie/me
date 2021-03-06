---
title: "jq: looping"
author: ""
type: ""
date: "2019-09-16T13:26:35-06:00"
subtitle: ""
image: ""
tags: ["jq", "bash", "JSON"]
draft: false
---

Here's a quick example of using jq in a for loop. jq has some nice functional stuff built in such as `map()`, but sometimes you need to do some fancy stuff with the data. <!--more--> This might be useful when you've filtered a jq array, and then need to iterate over the objects to do some work that you can't do in jq alone.

For this example, the goal is to iterate through an array of user objects, downloading their pictures. We'll use some fake user data from [reqres.in](https://reqres.in/), you can download it with:
```bash
curl https://reqres.in/api/users?page=1 > user_loop.json
```
```JSON
{
  "page": 1,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
    },
    {
      "id": 2,
      "email": "janet.weaver@reqres.in",
      "first_name": "Janet",
      "last_name": "Weaver",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
    },
    ...
  ]
}
```

Here's the finished result:
```bash
imagesDir="tmp_user_images"
mkdir -p $imagesDir

while read -r user; do
  avatarURL=$(echo $user | jq -r '.avatar')
  imagePath="${imagesDir}/$(echo $user | jq -r '.first_name + .last_name').jpg"
  echo "Downloading ${avatarURL} to ${imagePath}"
  curl -s -o ${imagePath} ${avatarURL}
done <<< "$(cat user_loop.json | jq -c '.data[]')"
```
The part of interest (the looping), is written like this:
```bash
while read -r user; do
  # do work on user object
done <<< "$(cat user_loop.json | jq -c '.data[]')"
```

## Breakdown
### Get the objects
First, we care only about the `data` array which stores our user objects containing the URLs, so we use that object id to access it:
```bash
cat user_loop.json | jq -c '.data[]'
```
Notice `-c` flag, it's important for looping over the objects. This tells jq to put each object onto a single line, which we'll use in the loop.

### Loop over lines
In bash, we can loop over lines by using the `while read -r varName; do ...; done <<< "$lineSeparatedVar"` pattern. `read -r <name>` will read in a line from STDIN, then assign the value to `<name>`; the `-r` flag tells `read` "do not allow backslashes to escape any characters".  
Now we can loop over objects from our array like so
```bash
while read -r user; do
  # do work on user object
done <<< "$(cat user_loop.json | jq -c '.data[]')"
```

## Notes
- I've not fully tested this code. You may want to base64 encode the objects, then decode them if you wanna be really safe.

- `curl` concurrently, toss a `&` on the end of the curl to run it as a background process