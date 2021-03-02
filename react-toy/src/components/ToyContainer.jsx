import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
    {
      props.toys.map(t => {
        return <ToyCard key={t.id} toy={t} updateToy={props.updateToy} deleteToy={props.deleteToy} />
      })
    }
    </div>
  );
}

export default ToyContainer;
