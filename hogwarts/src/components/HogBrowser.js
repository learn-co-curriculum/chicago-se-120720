import React from 'react'
import HogTile from './HogTile'

class HogBrowser extends React.Component {
 render(){
   return (
     <div className='ui three cards'>
     {
       this.props.hogs.map(hogObj => {
         return <HogTile hog={hogObj} key={hogObj.name} />
       })
     }
     </div>
   )
 }
}

export default HogBrowser
