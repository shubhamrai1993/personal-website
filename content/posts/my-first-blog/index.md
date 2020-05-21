---
title: 'Container networking: A tour'
cover: ./image.jpg
date: 2020-05-12
description: A demystification of docker networking
tags: ['post']
---

Recently I was trying to move an application from one server to another since the free trial for that cloud provider was getting expired 😅. I took this opportunity to containerise this application and all it's upstream dependencies and learn something new along the way. I soon realised that containers, especially when it comes to networking, don't quite work the same way as that of a process. There are nuances to how you want to go about setting up your application deployments and there are multiple options to choose from which makes it all the more worse for a newbie. Let's go through it one at a time.

We are not considering the docker swarm specific options here. That was not my use case and since the arrival of Kubernetes you have a better alternative.

Docker provides several networking drivers for you to start your container with. But first let's find out where to look at all the networks that the docker has created for you. 

```bash
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
4071b98202b2        bridge              bridge              local
badd725b14a0        host                host                local
97a49ff283fd        none                null                local
```

You can see that there are three types of networks docker daemon has already created for you. Each of these have their own names and network-id. We will go into the various drivers and how to use them in them next.

Docker has six networking options you can start your container with 

## 1. Bridge networks

Bridge is a link layer device that forwards traffic between two network segments. It provides an interface through which multiple disparate network segments can interact with each other and behave as a single cohesive unit. Docker uses the same idea to create a software bridge network that provides isolation between the docker host (the machine where the docker daemon is running) and the network that all the containers are running on. A bridge is created as soon as the docker daemon starts and all the containers launched on this host connects to this bridge by default. You can see this bridge network by executing this - 

You can get see details on this network using it's name or id - 

```bash
$ docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "15f169f892264417a374f774cd48a332831e64d89f9e1182e958b47183d675c2",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
    }
]
```

The thing to note here is IP Address Management (IPAM) config. All the containers attaching to this network will get IP addresses from this subnet.

Docker also provides you an option to create your own bridge network if required. These are called User Defined Bridge networks. Let's look at how to create one quickly - 

```bash
$ docker network create custom-network
34c9707787c96e777b3a2e0a2fac6284dd59da9753e3609c4007686b2e91fbbd
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
4071b98202b2        bridge              bridge              local
34c9707787c9        custom-network      bridge              local
badd725b14a0        host                host                local
97a49ff283fd        none                null                local
```

You can see that a new bridge network named custom network has been defined for you. By default it uses the `bridge` driver so we don't need to specify that here. It has several advantages over the default network. User defined networks allow you to address another container on the same network using it's name along with the IP assigned to it. You also get better isolation for your containers since all other containers listen on the default bridge network. You can also configure your custom network to cater to your requirement which might have unintended consequences on the default network.

## 2. Host networks

Docker allows you to leverage the network of the host machine i.e. the machine where docker daemon is running to launch containers directly. This is similar to launching an application on a host bound to a particular port. The container is assigned no IP address of it's own. You can address the application running inside the container directly using `localhost`. It is very useful when you want to just run an application with behaviour similar to a local installation. One huge limitation to this approach is that you can only use it from Linux.

To use this option, just specify it while launching your container - 

```bash
$ docker run --network host -d nginx:latest
27b01648936d03ccb214dd59f0175a6fada94fb80da32fa7b485ee91c37f2ffc
$ curl localhost:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
-------- nginx welcome page
```




This is an example blog post. All your blog posts should be here: `content/posts`.

Websites like Reddit, StackOverflow, and GitHub had millions of people using Markdown. And Markdown started to be used beyond the web, to author books, articles, slide shows, letters, and lecture notes.

What distinguishes Markdown from many other lightweight markup syntaxes, which are often easier to write, is its readability. As Gruber writes:

> The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions.

## Frontmatter

Metadata for your Markdown.

In this post it looks like this:

```md
---
title: Full Blog Post Example
cover: ./image.jpg
date: 2019-11-05
description: All the usual blog post.
tags: ['post']
---
```

Read more about this setting here: [github.com/Chronoblog/gatsby-theme-chronoblog#posts](https://github.com/Chronoblog/gatsby-theme-chronoblog#posts)

## Markdown

This post is a `markdown` file and you can do everything in it that allows you to do markdown.

### Headers

```md
# This is an <h1> tag

## This is an <h2> tag

###### This is an <h6> tag
```

# This is an `<h1>` tag

## This is an `<h2>` tag

###### This is an `<h6>` tag

### Emphasis

```md
_This text will be italic_  
**This text will be bold**
```

_This text will be italic_  
**This text will be bold**

### Lists

```md
- Item 1
- Item 2
  - Item 2a
  - Item 2b
```

- Item 1
- Item 2
  - Item 2a
  - Item 2b

### Images

```md
![image-in-post](./image-in-post.jpg)
```

![image-in-post](./image-in-post.jpg)

### Links

```md
[github.com/Chronoblog/gatsby-theme-chronoblog](https://github.com/Chronoblog/gatsby-theme-chronoblog)
```

[github.com/Chronoblog/gatsby-theme-chronoblog](https://github.com/Chronoblog/gatsby-theme-chronoblog)

### Blockquotes

```md
As Kanye West said:

> We're living the future so
> the present is our past.
```

As Kanye West said:

> We're living the future so
> the present is our past.

### Inline code

**`js:`**

```js
const someFun = (text) => {
  console.log('some ' + text);
};
someFun('text');
```

**`css:`**

```css
.thing {
  font-size: 16px;
  width: 100%;
}
@media screen and (min-width: 40em) {
  font-size: 20px;
  width: 50%;
}
@media screen and (min-width: 52em) {
  font-size: 24px;
}
```

**`jsx:`**

```jsx
<Thing fontSize={[16, 20, 24]} width={[1, 1 / 2]} />
```

What distinguishes Markdown from many other lightweight markup syntaxes, which are often easier to write, is its readability.
