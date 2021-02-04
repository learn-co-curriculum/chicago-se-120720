




let allPokemonData = []
const pokemonContainer = document.querySelector('#pokemon-container')
const pokemonSearchInput = document.querySelector('#pokemon-search-form')
const pokemonForm = document.querySelector('#pokemon-post-form')

fetch('http://localhost:3000/pokemon')
  .then(responseObject => responseObject.json())
  .then(pokeJSONData => {
    allPokemonData = pokeJSONData

    // set the innerHTML of pokeContainer equal to the output of the renderAllPokemon function
    pokemonContainer.innerHTML = renderAllPokemon(allPokemonData)
})


pokemonSearchInput.addEventListener('input', (event) => handleSearchInput(event, allPokemonData, pokemonContainer))

pokemonContainer.addEventListener('click', (event) => handleClick(event))




pokemonForm.addEventListener('submit', (event) => createPokemon(event, pokemonContainer))




//  find the form
//  bind a submit listener
//    once submitted:
//      preventDefault
//      scrape the data from the form
//      append the data to the FE
//      Post the data to the BE
//
//
