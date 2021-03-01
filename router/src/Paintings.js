


import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PaintingList from './PaintingList';
import artworks from './artworks';

class Paintings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paintings: artworks
    }; 
  }

 render(){
   return (
   <Switch>
     <Route render={() => {
       return <PaintingList paintings={this.state.paintings} />
     }} path='/paintings' />
   </Switch>
   )
 }
}

export default Paintings
