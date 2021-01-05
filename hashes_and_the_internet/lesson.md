# The Internet

The internet is a network of computers designed to transmit information.
**Client** and **Server** are two common roles that a computer can play when connected by the internet.

- A **client** is a computer making a *request*
- A **server** is a computer that *responds* with information

![Request Response Cycle](https://mdn.mozillademos.org/files/17297/simple-client-server.png)

When we "browse the internet" we are typically talking about making HTTP requests to visit a website through an internet browser like Chrome. Chrome sends a message and your ISP (internet service provider) routes the request to the appropriate address, i.e. google.com. The server at the specified address receives the message and responds with an HTML document which is read and displayed by your browser.

As developers, we often want to request different types of data.

> Why might developers want to request data in a format other than HTML?

# APIs

So far in our programs we've only used dummy data in isolation from the rest of the internet.

APIs (Application Programming Interface) are web apps that make data available to third party applications. As users of an API we only have access to a publicly available interface.

A real world analogy is an ATM. An ATM is an external interface which makes banking information available to certain people. Lots of things happen under the cover or within the bank's internal system, but the ATM is carefully designed to expose only the information that is relevant to users through a convenient public interface.

**Compare reddit.com to reddit.com/.json**

## JSON

**JSON** (JavaScript Object Notation) is a language-agnostic data format commonly used in APIs. It's looks similar to... a ruby hash!

The chrome extension "JSON Viewer" is handy for viewing JSON in a browser.

## Ruby Gems for working with APIs

Ruby "Gems" are open-source packages of code written by other people. They're freely accessible to use in any of your projects. Gems allow us to collaborate and leverage the work of others.

Popular gems have documentation and instructions for how to use them. Always do a little research to see if there's a well supported Ruby gem that might support your projects.

Two gem's we will often use moving forward:

- `rest-client`
- `json`  

**REST** is a architectural pattern followed by most modern APIs. We will talk a lot more about how to build RESTful APIs in future lessons but in the meantime understand that REST defines some standards for requesting information from an API. The `rest-client` gem gives our app methods for requesting information from RESTful APIs. 

The `json` gem provides methods for parsing JSON data.

## Setting up our project

We'll start by cloning the Project 1 repo

> You may need to run `bundle update` if you're getting dependency errors setting up

The `Rakefile` and `/config` files are set up for us.

- `rake db:create` to create our database and `/db` directory

## Movie Model

Create a file `lib/Movie.rb` for our model.

```ruby
class Movie

  def self.fetch_movies_playing_now
    # api call goes here
  end
end
```

We will need two gems to call to the api and then parse the returned data:

- "rest-client"
- "json"

We're going to use "The Movie Database" API in this demo. Lets walk through the documentation and make our first call.

```ruby
class Movie
  API_KEY = "41ecc174e82b6b1f94905705134b107a"

  def self.fetch_movies_playing_now
    api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=#{API_KEY}&language=en-US&page=1"

    response = RestClient.get(api_url)
  end
end
```

The response is in a difficult format to use and read. The `json` gem includes a `#parse` method to convert this JSON string into a Ruby `Hash`!

```ruby
def self.fetch_movies_playing_now
  api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=#{API_KEY}&language=en-US&page=1"
  response = RestClient.get(api_url)

  puts response
  JSON.parse(response.body)
end
```

## APIs in the `seed.rb` file

In many cases we may want to mutate the data we receive from an API. In these cases we can replicate the data in our database so we have full write (edit) access.


<!-- 
# Making request to Google Books API

install the required ruby gems

```ruby
require 'pry'
require 'rest-client'
require 'json'
```

Documentation for the Books API [Google Books API](https://developers.google.com/books/)

```ruby
def fetch_books(term)
    books_url = "https://www.googleapis.com/books/v1/volumes?q=#{term}"
    response = RestClient.get(books_url)

    JSON.parse(response.body)
end
```

We can iterate over each book and print the results.
```ruby
ruby_boks = fetch_books(ruby)

ruby_books["items"].each do |book|
    title = book["volumeInfo"]["title"]

    if  book["volumeInfo"]["authors"]
        authors = book["volumeInfo"]["authors"].join(" and ")
    else
        authors = "No authors found"
    end

    if book["volumeInfo"]["description"]
        description = book["volumeInfo"]["description"][0..140] + "..."
    else
        description = "No description available"
    end

    puts "*" * 30
    puts "Title: #{title}"
    puts "Authors: #{authors}"
    puts "Description: #{description}"
end
```

## Student Exercise

```
Deliverables
1. Write an application that takes a search term from a user
2. Make a Request to the GoogleBooks API and get back some results
3. Display the titles, author names, and description for each book
```

## Refactor with Single Responsibility

```ruby
require 'pry'
require 'rest-client'
require 'json'


# write an application that takes in some user input
def welcome
  puts "Welcome to the BookSearcher"
  puts "Please enter a term:"
end

def get_user_input
  gets.chomp
end


# make a request to the google books api using term

def fetch_books(term)
  response = RestClient.get("https://www.googleapis.com/books/v1/volumes?q=#{term}")

  JSON.parse(response.body)
end


def get_title(book)
  book["volumeInfo"]["title"]
end

def get_author(book)
  if  book["volumeInfo"]["authors"]
   book["volumeInfo"]["authors"].join(" and ")
  else
   "No authors found"
  end
end

def get_description(book)
  if book["volumeInfo"]["description"]
    book["volumeInfo"]["description"][0..140] + "..."
  else
    "No description available"
  end
end

def print_book(title, authors, description)
  puts "*" * 30
  puts "Title: #{title}"
  puts "Authors: #{authors}"
  puts "Description: #{description}"
end


def run
  welcome
  search_term = get_user_input

  fetch_books(search_term)["items"].each do |book|
    title = get_title(book)
    authors = get_author(book)
    description = get_description(book)

    print_book(title, authors, description)
  end
end

# and display a list of books, including title, author and description, that are found
run
``` -->