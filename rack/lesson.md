# The Internet

- cables and computers in a huge network!
![the internet](https://62e528761d0685343e1c-f3d1b99a743ffa4142d9d7f1978d9686.ssl.cf2.rackcdn.com/files/100571/wide_article/width1356x668/xc3r6bkv-1446489061.png)
- The World Wide Web is a service built on top of the internet
  - contains websites connected through hypertext links
    - written in HTML (Hypertext Markup Language)
    - accessible through web browsers using HTTP/HTTPS(Hypertext transfer protocol (secure))

## How it works

### HTTP

HTTP describes how webpages https://go.flatironschool.com/getting_started and files are sent over the internet. There are two key types of players: **clients** and **servers**

- clients are programs or browsers *requesting* information
- servers are computers that contain information and *respond*

When we visit a website, we are making a request from our browser (the client) to a server located at the URL we provided, i.e. a web *address*.

#### Parts of a URL

`https://go.flatironschool.com/getting_started`

- the protocol: `http://` or `https://` 
  - describes the protocol (the ~language~)
- the domain: `go.flatironschool.com`
  - can be a string or an IP address
  - top-level domain: `com`
  - second-level domain: `flatironschool`
  - sub-domain: `go`
- the resource: `getting-started`

## Request and Response Cycle
We're going to use two different web clients to make a request:

- postman
- chrome

### DNS Lookup

When a client makes a request the request passes through a number of intermediate steps before it gets to our server. This process is called 'DNS (Domain Name System) lookup' and it translates the string of our URL to an explicit IP address of a server.

The postal service is a loose analogy. In between you and the recipient of your letter, the letter has to move through a series of mailing facilities so that it can be efficiently directed to your recipient. Letters are first grouped generally by state perhaps, bundled and sent to a facility in that state where they are sorted again based on city or municipality. Each step gets more specific and closer to the recipient until the complete address is read and the letter is delivered to its recipient.

### Postman

Postman is a handy desktop application for making web requests. It gives you the ability to configure custom requests to test servers and see their responses. We often use it as a testing tool to confirm expectations about our application's responses or to debug.

- talk about request types
- show url input
- show response output

> What are we looking at? What is this code?

### Web Browsers

Web browsers are very similar to Postman, though their intended user is less technical. When we make a request, however, the response is identical. Our browser simply takes the HTML response and parses it to display a web page

- demo chrome web tools

When the browser receives the response it contains some meta-data about the response itself, a status, and the response body (in this case an HTML document)

When parsing the HTML the browser loads all of the resources defined in the document in a particular order. These assets include images, fonts, and usually scripts or CSS for styling

### HTTP Requests

There are a few important pieces to an HTTP request.

- resource path
- protocol
- user-agent,
- headers
- body

A basic GET request example

```http
GET /getting_started HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
Host: go.flatironschool.com
Accept-Language: en-us
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
```

GET is the simplest of the HTTP request methods. There are several others we will use in the following days: POST, PATCH, DELETE. The main different is that a GET request doesn't contain a body. In the other HTTP verbs the client sends data to the server in addition to expecting a response. A GET request only expects the response.

### HTTP Responses

Similar to requests, responses also contain a protocol, status, headers, and a body. The two most important pieces to keep in mind are the **status** and **body**.

- the status is a numeric code summarizing the response
  - 200: ok
  - 404: not found
  - 500: internal server error
- the body contains the requested information if the status is 200 ok.

```http
HTTP/1.1 404 Not Found
Date: Sun, 18 Oct 2012 10:36:20 GMT
Server: Apache/2.2.14 (Win32)
Content-Length: 230
Connection: Closed
Content-Type: text/html; charset=iso-8859-1

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
   <title>404 Not Found</title>
</head>
<body>
   <h1>Not Found</h1>
   <p>The requested URL /t.html was not found on this server.</p>
</body>
</html>
```

## Rack

Rack is a tool used to build web servers! It's used by Ruby frameworks like Rails and Sinatra.

### `Gemfile`

Rack is a ruby gem so we include it in our `Gemfile`

```ruby
source "https://rubygems.org"

gem "rack"
gem "pry"
```

### `config.ru`

This is a rackup file. It contains configuration and executes the rack server when we start our app.

```ruby
require "rack"
require "pry"
```

### `app.rb`

`app.rb` holds our "business logic" all of the behavior and functionality that runs on our server to process and respond to requests.

```ruby
# app.rb
class App
  def call(environment_hash)
    status_code = 200
    header = {}
    body = ['hello'] # or {}

    return [status_code, header, body]
  end
end
```

We create a class `App` with a method `#call` which accepts an environment hash and returns an array `[status_code, header, body]`

This array will be our response!

In `config.ru` we will call run `App.new` to initialize this class and leave the rest to Rack.

```ruby
# config.ru
require "rack"
require "pry"
require_relative "./app"

run App.new
```

Now our application is ready to run!

### Shotgun

> Demonstrate that without `shotgun` the server doesn't restart when code changes

Shotgun is another helpful gem in addition to Rack. Shotgun watches our app directory and reloads the server whenever it detects a change.

- add `gem "shotgun"` to the gemfile.
- quit rack with `ctrl+c`
- start the server through shotgun `shotgun`

### Paths

We can use a Rack utility `Rack::Request.new(environment_hash)` to get a better look at our request.

```ruby
class App
  def call(environment_hash)
    req = Rack::Request.new(environment_hash)

    binding.pry

    ...
  end
end

```

If we reference `req.path` we can see the requested path is `"/"`. By using the Rack methods `req.path.match("/")` we can start to conditionally alter the server response based on the url resource that the user requests.

```ruby
def call(environment_hash)
  req = Rack::Request.new(environment_hash)
  status_code = 200
  headers = {}

  case req.path 
  when "/about"
    body = ["this is the about page"]
  when "/contact"
    body = ["this is the contact page"]
  when "/"
    body = ["this is the home page"]
  else
    status_code = 400
    body = ["resource not found"]
  end
  
  return [status_code, headers, body]
end
```

Congrats we have a web server!!
