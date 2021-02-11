

// render all the quotes
// make form work
// delete
// like
//   --listen for a click
//   -- determine if it is a like btn
//   -- Update BE
//   -- update FE


function main(){
  fetchQuotes()
  createFormListener()
  createClickListener()
}

function createClickListener(){
  const quoteList = document.querySelector('#quote-list')
  quoteList.addEventListener('click', function(e){
    if (e.target.className === 'btn-danger') {
      deleteQuote(e)
    } else if (e.target.className === 'btn-success') {
      likeQuote(e)
    }
  })



  // find the element thata holds all of the buttons
  // bind it to a click listener
  //   confirm that it was the correct node that got clicked on
  //   Update BE
  //   Update FE
}


function likeQuote(e){
  const quoteId = parseInt(e.target.dataset.id)


  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quoteId: quoteId,
      createdAt: Date.now()
    })
  }

  fetch('http://localhost:3000/likes', reqObj)
  .then(resp => resp.json())
  .then(data => {
    debugger
    const likeSpan = e.target.firstElementChild
    likeSpan.innerText = parseInt(likeSpan.innerText) + 1

  })
}



function deleteQuote(e){
  const quoteId = e.target.dataset.id
  fetch(`http://localhost:3000/quotes/${quoteId}`, { method: 'DELETE' })
  .then(resp => resp.json())
  .then(data => {
    e.target.parentNode.parentNode.remove()
  })
}















function createFormListener(){
  const form = document.querySelector('form')

  form.addEventListener('submit', function(e){

    e.preventDefault()
    const newQuote = {
      quote: e.target['quote'].value,
      author: e.target['author'].value,
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    }


    fetch('http://localhost:3000/quotes', reqObj)
    .then(resp => resp.json())
    .then(quote => {
      e.target.reset()

      const updatedQuote = {
        ...quote,
        likes: []
      }

      renderQuote(updatedQuote)

    })
  })
}


















// grab the form that we want to listen to 
// add a listner (submit)
// once submitted:
//   - prevent default
//   - scrape the form for all the data and build our new quote object
//   - Update our BE: (post req)
//      - assemble reqobj 
//      - send fetch
//   - Update our FE


function fetchQuotes(){

  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(resp => resp.json())
  .then(quotes => {
    quotes.forEach((quote) => {
      renderQuote(quote)
    })
  })
}
// make a get req
// when it returns with arr
// parse the json
// iterate over arr
//   for each:
//      build out the dom nodes for each quote card


function renderQuote(quote){
  // - create correct elements
  // - add correct attribute
  // - append correctly
  // - introduce dynamicism





  const quoteList = document.querySelector('#quote-list')

  const li = document.createElement('li')
  li.className = 'quote-card'


  const blockQuote = document.createElement('blockquote')
  blockQuote.className = 'blockquote'



  const p = document.createElement('p')
  p.className = 'mb-0'
  p.innerText = quote.quote

  const footer  = document.createElement('footer')
  footer.className= 'blockquote-footer'
  footer.innerText = quote.author

  const br = document.createElement('br')

  const likeBtn = document.createElement('button')
  likeBtn.dataset.id = quote.id
  likeBtn.className= 'btn-success'
  likeBtn.innerText = 'Likes: '

  const span = document.createElement('span')
  span.innerText = quote.likes.length

  const deleteBtn= document.createElement('button')
  deleteBtn.className= 'btn-danger'
  deleteBtn.innerText = 'Delete'
  deleteBtn.dataset.id = quote.id



  likeBtn.append(span)
  blockQuote.append(p, footer, br, likeBtn, deleteBtn)
  li.append(blockQuote)

  quoteList.append(li)
}




main()
