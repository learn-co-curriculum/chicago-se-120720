import React, { Component } from 'react'



class DigitalClock extends Component {
  constructor(){
    super()


    this.state = {
      time: this.getTime()
    }
  }


  getTime = () => {
    const date =  new Date();
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return `${h}: ${m}: ${s}`
  }


  componentDidMount(){
    this.intervalId = setInterval(() => {
      console.log(this.getTime())

      this.setState({
        time: this.getTime()
      })

    }, 1000)
  }


  componentWillUnmount(){
    clearInterval(this.intervalId)

    // this gets invoked right before a component gets unmounted (i.e removed from the DOM)
    // use this LCM in order to destroy continously running processes
  }



  render () {
    return (
      <div className="app-children">
        <h2 id="digital" >
          {this.state.time}
        </h2>
      </div>
    )
  }
}

export default DigitalClock










