


import React from 'react'

class Dashboard extends React.Component {

 render(){
   console.log(this.props, '------');

   return (
   <div>
     <h4>Hello {this.props.match.params.title}</h4>
   </div>
   )
 }
}

export default Dashboard
