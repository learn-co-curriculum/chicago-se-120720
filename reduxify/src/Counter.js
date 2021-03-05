import React, { Component } from 'react';

class Counter extends Component {
  constructor() {
    super();

    this.state = {
      count: 79
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
    // this.setState(function(prevState) {
    //   return { count: prevState.count + 1 };
    // });
  }

  render() {
    console.log('the new state', this.state.count);
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleClick}> + </button>
      </div>
    );
  }
}

export default Counter;
