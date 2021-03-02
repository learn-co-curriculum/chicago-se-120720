import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushis.map(sushiObj => {
            return <Sushi handleEaten={props.handleEaten} key={sushiObj.id} sushi={sushiObj} />
          })
        }
        <MoreButton handleMore={props.handleMore} />
      </div>
    </Fragment>
  )
}

export default SushiContainer
