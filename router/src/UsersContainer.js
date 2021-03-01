


import React from 'react'
import {Switch, Route} from 'react-router-dom'

class UsersContainer extends React.Component {
 render(){
   return (
   <div>
     <Switch>
       <Route exact path='/users/dashboard' render={ () => <h4>dashboard</h4>}/>
       <Route exact path='/users/info' render={ () => <h4>info</h4>}/>
     </Switch>
   </div>
   )
 }
}

export default UsersContainer
