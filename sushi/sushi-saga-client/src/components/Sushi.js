import React, { Fragment } from 'react'


const Sushi = (props) => {
  const { id, name, price, img_url, isEaten } = props.sushi

  return (
    <div className="sushi">
      <div className="plate" 
           onClick={() => props.handleEaten(id, price)}>
        { 
          isEaten
          ?
            null
          :
            <img src={img_url} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}

export default Sushi
