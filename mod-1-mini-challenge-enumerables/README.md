# Enumerable Practice

## Instructions

Fork this repo, then run `git clone` to download it locally. Then `cd` into the downloaded directory and open it in your text editor with `code .`.

In the `run.rb` file, there is an array of hashes representing different spicy foods. 

```rb
spicy_foods = [
  { name: 'Buffalo Wings', cuisine: 'American', heat_level: 3 },
  { name: 'Mapo Tofu', cuisine: 'Sichuan', heat_level: 6 },
  { name: 'Green Curry', cuisine: 'Thai', heat_level: 9 },
]
```

We're going to practice using Ruby enumerable methods to solve a few deliverables. You *could* use `.each` to solve all of these, but try to expand your toolkit and use some other enumberable methods to make the job easier, like `.map`, `.select`, and `.find`.

**NOTE**: There are no tests for this assignment! After writing each method, check if it's working by calling the method yourself using `binding.pry` or `p` to display some output in the terminal.

## Deliverables
Define methods for the following deliverables:

- `print_spicy_foods(spicy_foods)` 
    - given an array of spicy foods, **output to the terminal** each spicy food in the following format: `Buffalo Wings (American) | Heat Level: 🌶🌶🌶`.
- `get_names(spicy_foods)` 
    - given an array of spicy foods, **return an array of strings** with the names of each spicy food.
- `spiciest_foods(spicy_foods)` 
    - given an array of spicy foods, **return an array of hashes** where the heat level of the food is greater than 5.
- `get_spicy_food_by_cuisine(spicy_foods, cuisine)` 
    - given an array of spicy foods and a string representing a cuisine, **return a single hash** for the spicy food whose cuisine matches the cuisine being passed to the method.
- **BONUS** `print_spiciest_foods(spicy_foods)` 
    - given an array of spicy foods, **output to the terminal** ONLY the spicy foods that have a heat level greater than 5, in the following format: `Buffalo Wings (American) | Heat Level: 🌶🌶🌶`. Try to use methods you've already written to solve this!
- **BONUS** `average_heat_level(spicy_foods)` 
    - given an array of spicy foods, **return an integer** representing the average heat level of all the spicy foods in the array.


## Submitting

When you’re finished, run the following commands in your terminal to submit:

```
git add .
git commit -m 'Done'
git push
```
