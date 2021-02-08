
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.


function main(){
  fetchTrainers()
  createClickListener()
}


function createClickListener(){
  const main = document.querySelector('main')
  main.addEventListener('click', function(event){
    const node = event.target
    if (node.className === 'add' && node.nextElementSibling.children.length < 6 ) {
        addPokemon(event)
    } else if (event.target.className === 'release') {
      deletePokemon(event)
    }
  })
}


function deletePokemon(event){
  const pokeId = event.target.dataset.pokemonId

  fetch(`${POKEMONS_URL}/${pokeId}`, { method: 'DELETE' })
  .then(resp => resp.json())
  .then(data => {
    event.target.parentNode.remove()
  })
}




















function addPokemon(event){
  const trainerId = event.target.dataset.trainerId

  const newPokemon = { trainerId: trainerId }

  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPokemon)
  }

  fetch(POKEMONS_URL, reqObj)
  .then(resp => resp.json())
  .then(pokemon => {
    const li= document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    const removeBtn= document.createElement('button')
    removeBtn.className = 'release'
    removeBtn.innerText = 'release'
    removeBtn.setAttribute('data-pokemon-id', pokemon.id)

    li.append(removeBtn)

    const ul = event.target.nextElementSibling
    ul.append(li)
    
  })


}





function fetchTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    trainers.forEach(function(trainer){
      renderCard(trainer)
    })
  })
}

function renderCard(trainer){
  const main = document.querySelector('main')

  const card = document.createElement('div')
  card.className = 'card'
  card.setAttribute('data-id', trainer.id)

  const pTag = document.createElement('p')
  pTag.innerText = trainer.name

  const button = document.createElement('button')
  button.className = 'add'
  button.setAttribute('data-trainer-id', trainer.id)
  button.innerText = 'Add Pokemon'

  const ul= document.createElement('ul')
  ul.id = `ul-${trainer.id}`

  trainer.pokemons.forEach(function(pokemon){
    const li= document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    const removeBtn= document.createElement('button')
    removeBtn.className = 'release'
    removeBtn.innerText = 'release'
    removeBtn.setAttribute('data-pokemon-id', pokemon.id)

    li.append(removeBtn)
    ul.append(li)
  })

  card.append(pTag, button, ul)
  main.append(card)

}











main()
