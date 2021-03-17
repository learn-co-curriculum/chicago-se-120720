import React from 'react';
import { connect } from 'react-redux'
import { selectMuseumThunk } from '../actions/index'

const MuseumPicker = (props) => {
  return (
    <div className="row">
      <div className="ui menu">
        <div className="active item">All Museums</div>
        <div className="item" onClick={() => { props.selectMuseumThunk('National Gallery of Art, Washington D.C.')}}>National Gallery of Art, Washington D.C.</div>
      </div>
    </div>
  );
};


const mapDispatchToProps = {
  selectMuseumThunk
}

export default connect(null, mapDispatchToProps)(MuseumPicker)
