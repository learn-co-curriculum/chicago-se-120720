



// 1) X render all of the books from BE
// 2) user can submit form to save and see the book they added
//    -- grab the form off of our DOM
//    -- bind to a submit event
//    ---- once submitted:
//          -- prevent the default
//          -- scrape the formdata
//          -- reset the form
//          -- Update the BackEnd
//             -- assemble the reqObj
//             -- create the fetch
//          -- Update the FrontEnd
//
//
// 3) potential: a user can delete a book






function main(){
  fetchBooks()
  createFormListener()
}


function createFormListener(){
  const form = document.querySelector('form')
  form.addEventListener('submit', function(e){
    e.preventDefault()

    const newBook = {
      title: e.target['title'].value,
      author: e.target['author'].value,
    }


    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    }




    fetch('http://localhost:3000/books', reqObj)
    .then((resp) => resp.json())
    .then(book => {
      form.reset()
      renderBook(book)
    })
  })
}


function renderBook(book){
  const pTag = document.createElement('h4')
  pTag.innerText = `${book.title} - ${book.author}`

  const booksContainer = document.querySelector('#book-list')

  booksContainer.append(pTag)
}





function fetchBooks(){
  fetch('http://localhost:3000/books')
  .then(resp => resp.json())
  .then(books => {

    books.forEach(function(book){
      renderBook(book)
    })

  })

}





main()
















// psuedocode for fetchBooks
    // // X iterate overs the books arr
    // create a new node (p)
    // find the div to append to 
    // append the ptag to that div

