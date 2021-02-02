

function main(){
  createFormListener()
}


function createFormListener(){

  const form = document.querySelector('form')

  form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('--form got submitted----');
  })

  // grab the form
  // listen for the submission of that form
  // once submitted
  //   create a new node (p)
  //   find the commentsContainer
  //   insert that node into commentsContainer
}



main()

























































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
