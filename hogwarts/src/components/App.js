import React, { Component } from "react";
import "../App.css";
import Nav from "./Nav";
import hogs from "../porkers_data";
import HogBrowser from "./HogBrowser";
import Filter from "./Filter";

// Display all hogTiles
// ----------------
// capture the hogdata and hold it in state 
// create the component responsible for iteration
//   - pass the hogs array into that component as props

// In HogBrowser
//   - map over all of the hog object and return a HogTile Component
//      - making sure to provide it with individual hog data as props
//      - and a key
//
// In HogTile
//   - render the hog Info


class App extends Component {
  constructor(){
    super()

    this.state = {
      hogs: hogs,
      showGreasedOnly: false,
      sortBy: ''
    }
  }

  handleGreased = () => {
    this.setState({
      showGreasedOnly: !this.state.showGreasedOnly
    })
  }

  updateSortBy = (e) => {
    this.setState({
      sortBy: e.target.value
    })
  }

  findHogsToShow = () => {
    let updatedHogs = this.state.hogs



    if (this.state.showGreasedOnly) {
      updatedHogs = updatedHogs.filter(hogObj => hogObj.greased)
    } 


    if (this.state.sortBy === 'name') {


      updatedHogs.sort(function(hogA, hogB) {
        const nameA = hogA.name.toUpperCase(); // ignore upper and lowercase
        var nameB = hogB.name.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

    } else if (this.state.sortBy === 'weight'){
      updatedHogs.sort(function (hogA, hogB) {
        return hogA.weight - hogB.weight;
      });
    }



    return updatedHogs
  }



  render() {
    const filteredHogs = this.findHogsToShow()

    return (
      <div className="App">
        <Nav />
        <Filter handleGreased={this.handleGreased} updateSortBy={this.updateSortBy} />
        <HogBrowser hogs={filteredHogs} />
      </div>
    );
  }
}

export default App;













