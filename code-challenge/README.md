# BetterLyft™ 

## Deliverables
You are building an app for a Lyft/Uber competitor. The models that you will use for your application are: Passenger, Driver, and Ride.

## Domain Modeling
  - A Passenger has many rides
  - A Driver has many rides
  - A Ride belongs to a passenger and a driver
  - A passenger has many drivers through rides
  - A driver has many passengers through rides

Always start by drawing out the relationship either on a whiteboard or piece of paper. Think about how each of these models will be connected. From there then begin writing code.

## Deliverables

We'd like for you build out the following methods for each class. As you work, we want to make sure we are testing our code every step of the way. We've made a file for you to test out your methods. Make sure you `bundle install` first. Then, you can run the command `ruby tools/console.rb` and it will run that file, along with all of the variables or actions you declare in the `tools/console.rb`.

#### Passenger
A Passenger should be initialized with a name as a string. After the Passenger has been initialized, it shouldn't be changed.
- `Passenger#name`
  - Returns the name of the passenger
- `Passenger.all`
  - Returns an array of all Passengers
- `Passenger#rides`
  - Returns an array of Ride instances that this person has been on
- `Passenger#drivers`
  - Returns an array of Driver instances that this person has rode with
- `Passenger#total_distance`
  - Returns the floating number that represents the total distance the passenger has travelled using the service
- `Passenger.premium_members`
  - Returns an array of all Passengers who have travelled over 100 miles in total with the service

#### Ride
A Ride should be initialized with a driver (as a Driver object), a passenger (as a Passenger object), and a distance (as a float i.e. `3.2`). The distance refers to miles.
- `Ride#passenger`
  - Returns the Passenger object for that ride
- `Ride#driver`
  - Returns the Driver object for that ride
- `Ride#distance`
  - Returns the distance of the ride
- `Ride.average_distance`
  - Returns the average distance across ALL rides
  
#### Driver
A Driver should be initialized with a name as a string.
- `Driver#name`
  - Returns the driver's name
- `Driver.all`
  - Returns an array of all Drivers
- `Driver#rides`
  - Returns an array of all Rides a driver has made
- `Driver#passenger_names`
  - Returns an array of all Passengers' names a driver has driven. The names should be **unique** (no repeats).
- `Driver.mileage_cap(distance)`
  - Takes an argument of a distance (float) and returns an array of all Drivers who have driven over the mileage

