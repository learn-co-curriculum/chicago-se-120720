





function main(){
  createFormListener()
}


function createFormListener(){

  const form = document.querySelector('form')

  form.addEventListener('submit', function(event){
    event.preventDefault()

    const newComment = event.target['comment-field'].value

    const pTag = document.createElement('p')
    pTag.innerText = newComment


    const commentsContainer = document.querySelector('#comments-container')
    commentsContainer.append(pTag)

    form.reset()
  })

  // grab the form
  // listen for the submission of that form
  // once submitted
  //   prevent default
  //   scrape the form data
  //   create a new node (p)
  //   add form data to the node
  //   find the commentsContainer
  //   insert that node into commentsContainer
}



main()




const name = 'hello'

console.log(name, '------');

name = name + ' world'



console.log(name, '------');












































// ind the button off the DOM
// listen to the button (click)
// once clicked:
//   trigger an alert


// const alertBtn = document.querySelector('#alert-btn')

// alertBtn.addEventListener('click', function(){
  // alert('alert triggered')
// })


// const consoleBtn = document.querySelector('#console-btn')

// consoleBtn.addEventListener('click', consoleResponse)

// function consoleResponse(){
  // console.log('console got clicked')
// }
