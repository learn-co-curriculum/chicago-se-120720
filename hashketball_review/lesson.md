# Hashketball Review

## A note on lectures

Follow along, don't code along. Lectures are an opportunity to dive into concepts where labs are meant for hands-on practice. Coding along during lectures may be tempting however, the high likelihood of bugs along the way puts us at risk for distraction.

## Testing

Most labs include an Rspec test suite. These tests can typically be run with the `learn test` command. Tests are a great way to check your progress and find hints for what to work on next.

You can also run tests with the `rspec` command.

You can run a specific file:

```bash
# rspec /path/to/spec.rb

rspec spec/hashketball_spec.rb
```

or a specific spec in a file:

```bash
# rspec /path/to/spec.rb:line_no

rspec spec/hashketball_spec.rb:97
```

### Errors

One of the most important skills we will develop is understanding errors. When you run the tests you may hit errors when rspec references your code.

Errors are helpful and give explicit information about where to look and what needs to be fixed. Practice reading errors closely to learn which pieces of information are most helpful for you to debug your code.

### Spec files

Tests can sometimes be "fragile" meaning they might have a narrow scope of what technically passes. A failing test doesn't necessarily mean you haven't met the deliverable only that the test's expectations weren't met.

Learning to read the spec files when you get failing tests will help you deduce exactly what the test is evaluating.

## Review

We start today with a working `#game_hash` method and our focus will be on building out the `#num_points_scored` method. 

This method will:

- take a name as an argument
- return the number of points that player scored

We will start by writing some pseudo-code to help organize our thinking and strategy

```ruby
def num_points_scored(player_name)
  # get a list of all the players
  # find the player whose name matches the argument 'player_name'
  # return that player's points
end
```

### `#get_players`

To begin we need a list of all of the players. Fortunately this data is available though it's nested within the `game_hash`.

If we look at our `game_hash` we see that there are two items in the hash with keys, `:home` and `:away`, which each individually hold a hash with data related to each team.

> For this method, are the keys `:away` and `:home` related to our method deliverables?

#### `Hash#values`

Nope, it doesn't matter which team the player is on, we're only concerned with how many points they scored. So lets first narrow our dataset by calling `.values` on `game_hash`.

`#values` if called on a hash will return an array of the hash's values. In this case hashes of team info. Each of these hashes looks like this.

```ruby

game_hash.values
# =>
# {
#   team_name: "Brooklyn Nets",
#   colors: ["Black", "White"],
#   players: [
#     {
#       player_name: "Alan Anderson",
#       number: 0,
#       shoe: 16,
#       points: 22,
#       rebounds: 12,
#       assists: 12,
#       steals: 3,
#       blocks: 1,
#       slam_dunks: 1
#     },
#     {
#       player_name: "Reggie Evans",
#       number: 30,
#       shoe: 14,
#       points: 12,
#       rebounds: 12,
#       assists: 12,
#       steals: 12,
#       blocks: 12,
#       slam_dunks: 7
#     },
#     {
#       player_name: "Brook Lopez",
#       number: 11,
#       shoe: 17,
#       points: 17,
#       rebounds: 19,
#       assists: 10,
#       steals: 3,
#       blocks: 1,
#       slam_dunks: 15
#     },
#     {
#       player_name: "Mason Plumlee",
#       number: 1,
#       shoe: 19,
#       points: 26,
#       rebounds: 11,
#       assists: 6,
#       steals: 3,
#       blocks: 8,
#       slam_dunks: 5
#     },
#     {
#       player_name: "Jason Terry",
#       number: 31,
#       shoe: 15,
#       points: 19,
#       rebounds: 2,
#       assists: 2,
#       steals: 4,
#       blocks: 11,
#       slam_dunks: 1
#     }
#   ]
# }
```

> Of the keys in our team info, which are related to the deliverables at hand?

#### `Array#map`

The `:players` key!

We have an array of two hashes and therefor two `:players` keys that we need to search for a player within. Let's further reduce the scope of data we're working with to make this search easier.

`Array#map` is an extremely useful Ruby method. It takes an array of `x` items and returns a new array of `x` items. The new items are created based of the code defined in the block.

In our case we want to take an array of two hashes and return the value of each of their `:players` keys.

```ruby
def num_points_scored(player_name)
  team_info_array = game_hash.values
  players_arrays_array = team_info_array.map do |team|
    team[:players]
  end
end
```

> Why did I name this new variable `players_arrays_array`? Seems redundant?

#### `Array#flatten`

It is a bit redundant but it's reflective of the "nested" arrays we currently have. Map returns an array and each value of the `:players` key is also an array. So we have something like this:

```ruby
players_arrays_array = [[player1, player2, player3, ...],[player1, player2, ...]]
```

Because there's no distinction between these two groups of players we should combine them into a single array or "flatten" the nested array with `Array#flatten`.

```ruby
def num_points_scored(player_name)
  team_info_array = game_hash.values
  players_arrays_array = team_info_array.map do |team|
    team[:players]
  end
  players_array = players_arrays_array.flatten
end
```

#### Abstraction

Amazing, we've taken a complex `game_hash` and reduced it to a more useful array of players. Now is a great moment to refactor and abstract this logic into a helper method

```ruby
def num_points_scored(player_name)
  # get a list of all the players
  get_players
  # find the player whose name matches the argument 'player_name'
  # return that player's points
end

def players
  players_arrays_array = game_hash.values.map do |team|
    team[:players]
  end

  players_arrays_array.flatten
end
```

> Why call this process abstraction?

Abstraction helps us create accessible interfaces for complex logic. By creating a helper method we have easy access to an array of players by simply calling `#players`. All of the complexity is neatly packaged within the method definition while the method name carries just enough information to show it's utility.

> What are some benefits of abstracting this method?

- our code is reusable and modular
- our code is easier to read and understand

### `#find_player`

Next we need to take this array of players and select the player who's name matches our `player_name` argument.

#### `Array#find`

The `#find` enumerable is a great candidate for this. `#find` searches through an array and returns the first item that matches the conditions defined in the block.

```ruby
def num_points_scored(player_name)
  # get a list of all the players
  all_players = players
  
  # find the player whose name matches the argument 'player_name'
  all_player = players.find do |player|
    player[:name] = player_name
  end
  # return that player's points
end
```

#### Single Responsibility

Our `#num_points_scored` method is getting complex again. Lets abstract out the logic to find a player.

```ruby
def find_player(players, player_name)
  players.find do |player|
    player[:player_name] == player_name
  end
end
```

Continuing to refactor and abstract helper methods in this way promotes "Single Responsibility". Single Responsibility is an important principle in programming. It means every (method/file/directory) should be clearly defined to do one thing and nothing else.

Along with clear naming, this practice makes our code more accessible and functional and leads to fewer bugs when we want to change code or add features.

### Putting it all together

```ruby
def num_points_scored(player_name)
  player = find_player(players, player_name)

  player[:points]
end

def players
  players_arrays_array = game_hash.values.map do |team|
    team[:players]
  end
  
  players_arrays_array.flatten
end

def find_player(players, player_name)
  players.find do |player|
    player[:player_name] == player_name
  end
end
```