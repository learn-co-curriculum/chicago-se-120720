

//
// Pure functions
//

// A function is considered pure if: 

// 1. given an certain input a pure f(x) will always produce the same output
// 2. a pure function has no external side effects




const myCart = {
  socks: 2,
  shoes: 1
}

const addToShoppingCart = (currentCart, newItem, quantity) => {
  const updatedCart = {
    ...currentCart,
    [newItem]: quantity
  }
  return updatedCart
}




console.log(myCart, '------');

addToShoppingCart(myCart, 'racket', 3)

console.log(myCart, '------');





























// Higher Order Function
// HOF are functions that either take a function as an input or produce a function as an output
//
//





// const forEach = (arr, callback) => {
  // for(let i = 0; i < arr.length; i++) {
    // const element = arr[i]
    // callback(element)
  // }
// }




// const map = (arr, callback) => {
  // const output = []

  // for (let i = 0; i < arr.length; i++){
    // const element = arr[i]
    // output.push(callback(element))
  // }

  // return output
// }

// [1, 2, 3].map(function(num){
  // return num * 110
// })



// [{name: 'danielle'}, {name: 'erin'}].map(function(user){
  // console.log(user.name, '------');
// })







// Why HOF? They allow for ABSTRACTION


















const double = (num) => {
  const foo = [1, 2, 4]

  num * 2

  return foo
}

const output = double(5)

console.log(output, '------');




















function greetingFactory(greet){
  return (name) => {
    return `${greet}, ${name}`
  }
}







const hiMaker = greetingFactory('hi')
const heyMaker = greetingFactory('hey')












const holaMaker = greetingFactory('hola')


console.log(hiMaker('marc'))
console.log(hiMaker('abbie'))
console.log(hiMaker('nicole'))


console.log(holaMaker('marc'))
console.log(holaMaker('abbie'))
console.log(holaMaker('nicole'))












// function greeting(greet, name) {
    // return `${greet}, ${name}`
// }




















































































// Closure

// if a HOF returns a function, it can be a closure if it accesses variables from the scope of the outer function





function odometerFactory(){
  let odometer = 100000


  return function(){
    odometer = odometer + 10

    console.log('your current mileage is: ', odometer)
  }

}



const incrementOdometer = odometerFactory() // function



incrementOdometer()

























// let x = 'hi'

// const xChanger = () => {
  // let x = 'hello'


  // x = 'foo'
// }







// class User {

  // set name(name){
    // if (name.length < 3) {
      // console.log('-new name is invalid-----');
    // }

    // this._name = name
  // }

  // get name(){


    // return this._name
  // }
// }


// const raza = new User()


// raza.name = 'ra'






































