import React from 'react';

const PaintingShow = props => {
  console.log(props)
  return (
    <div className="App">
      <img src={props.painting.image} />
      <h4>THIS IS THE PAINTING SHOW PAGE</h4>

      {props.painting.title}
    </div>
  );
};

export default PaintingShow;
