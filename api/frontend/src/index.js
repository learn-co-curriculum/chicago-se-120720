// grab and render all the existing animals in our rails app
// create a new animal
// delete



function main(){
  fetchAnimals()
  createFormListener()
  createDeleteListener()
}

function createDeleteListener(){
  const tBody = document.querySelector('tbody')
  tBody.addEventListener('click', function(e){

    if(e.target.className === 'delete-btn') {

      const id = e.target.dataset.id

      const reqObj = {
        method: 'DELETE'
      }

      fetch(`http://localhost:3000/animals/${id}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        e.target.parentNode.parentNode.remove()
      })
    }

  })
}






























function createFormListener(){
  const form = document.querySelector('form')

  form.addEventListener('submit', function(e){
    e.preventDefault()

    const newAnimal = {
      name: e.target['name'].value,
      gender: e.target['gender'].value,
      species: e.target['species'].value,
    }

    form.reset()


    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnimal)
    }

    fetch('http://localhost:3000/animals', reqObj)
    .then(resp => resp.json())
    .then(animal => {
      renderAnimal(animal)
    })
  })
}


function renderAnimal(animal){
  const row = document.createElement('tr')

  const animalNode = document.createElement('td')
  animalNode.innerText = animal.name


  const genderNode = document.createElement('td')
  genderNode.innerText = animal.gender


  const speciesNode = document.createElement('td')
  speciesNode.innerText = animal.species

  const deleteBtn = document.createElement('button')
  deleteBtn.dataset.id = animal.id
  deleteBtn.className = 'delete-btn'
  deleteBtn.innerText = 'remove'

  speciesNode.append(deleteBtn)


  row.append(animalNode, genderNode, speciesNode)

  const tBody = document.querySelector('tbody')
  tBody.append(row)
}




function fetchAnimals(){
  fetch('http://localhost:3000/animals')
  .then(resp => resp.json())
  .then(animals => {
    animals.forEach(function(animal){
      renderAnimal(animal)
    })
  })
}



main()
