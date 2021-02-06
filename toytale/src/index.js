

let addToy = true;

document.addEventListener("DOMContentLoaded", main);


function main(){
  createButtonListener()
  fetchToys()
  createFormListener()
  createLikeListener()
}


function createLikeListener(){
  const toyContainer = document.querySelector('#toy-collection')

  toyContainer.addEventListener('click', function(e){
    if (e.target.className === 'like-btn') {
      const id = e.target.dataset.id
      const pTag = e.target.previousElementSibling
      const currentLikes = parseInt(pTag.innerText.split(' ')[0])

      const reqObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: currentLikes + 1 })
      }


      fetch(`http://localhost:3000/toys/${id}`, reqObj)
      .then(resp => resp.json())
      .then(updatedToy => {
        pTag.innerText = `${updatedToy.likes} likes`
      })

    }
  })

}






function createFormListener(){
  const form = document.querySelector('form')

  form.addEventListener('submit', function(e){
    e.preventDefault()

    const newToy = {
      name: e.target['name'].value,
      image: e.target['image'].value,
      likes: 0
    }

    form.reset()

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }


    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(toyObj => {
      renderToy(toyObj)
    })
  })
}


function renderToy(toyObj){
  const div = document.createElement('div')
  div.setAttribute('class', 'card')

  const h2 = document.createElement('h2')
  h2.innerText = toyObj.name

  const img = document.createElement('img')
  img.src = toyObj.image
  img.setAttribute('class', 'toy-avatar')

  const p = document.createElement('p')
  p.innerText = `${toyObj.likes} likes`

  const button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.dataset.id = toyObj.id

  button.innerText = 'like'


  div.append(h2, img, p, button)

  const toysContainer = document.querySelector('#toy-collection')

  toysContainer.append(div)
}



function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(function(toyObj){
      renderToy(toyObj)
    })
  })
}



function createButtonListener(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

}







  // FETCH TOYS
  // make a fetch
  // when it comes back:
  //  parse the json to get toys array
  //    iterate over the toys array
  //    for each toy object
  //      create the proper nodes for each card
  //      append the card into the toyContainer

// function createFormListener(){
  // find the form 
  // bind the form so it listen to a submit
  //   once it's submited:
  //     prevent default
  //     scrape the formdata for the new toy
  //
  //
  //    UPDATE THE BACKEND
    //     create the reqObj
    //       - method
    //       - headers
    //       - body
    //     fetch (post)
  //   UPDATE THE FRONTEND     
  //       render a new card for the toy we just added 

// }

