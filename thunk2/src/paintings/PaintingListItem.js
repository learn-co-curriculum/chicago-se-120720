import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const PaintingListItem = ({ painting, selectPainting }) => {
  return (
    <div onClick={() => selectPainting(painting.id)} className="ui item">
      <span style={{ cursor: 'pointer' }}>{painting.title}</span>
    </div>
  );
};

export default connect(null, actions)(PaintingListItem);
