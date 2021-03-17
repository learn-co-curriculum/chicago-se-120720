
import React from 'react';
import { connect } from 'react-redux'
import { deletePaintingThunk, upvotePaintingThunk } from '../actions/paintings'

const Painting = props => {
  return (
    <div className="item">
      <div className="ui small image">
        <img src={props.painting.image} alt={props.painting.slug} />
      </div>
      <div className="middle aligned content">
        <div className="header">{`"${props.painting.title}" by ${props.painting
          .artist.name}`}</div>
        <div className="description">
          <a onClick={() => props.upvotePaintingThunk(props.painting.id, props.painting.votes)}>
            <i className="large caret up icon" />
            {props.painting.votes} votes
          </a>
        </div>
        <div className="ui red basic button" onClick={() => props.deletePaintingThunk(props.painting.id)}>
          Delete It
        </div>
      </div>
    </div>
  );
};


const mapDispatchToProps = {
  upvotePaintingThunk: upvotePaintingThunk,
  deletePaintingThunk: deletePaintingThunk
}

export default connect(null, mapDispatchToProps)(Painting)













