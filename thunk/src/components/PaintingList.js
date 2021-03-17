

import React from 'react';
import DeleteablePainting from './DeleteablePainting';
import Painting from './Painting';
import { connect } from 'react-redux'
import { fetchPaintingsSuccess, fetchPaintingsThunk } from '../actions/paintings'


class PaintingList extends React.Component {
  componentDidMount(){
    this.props.fetchPaintingsThunk()
  }


  renderPaintings = () => {
    return this.props.paintings.map(p => (
      <Painting painting={p} handleVote={this.handleVote}  />
    ));
  }

  render() {
    return (
        <div>
            <div>
                <h1>All Paintings</h1>
                <div className="ui items">{this.renderPaintings()}</div>
            </div>
        </div>
    );
  }
}

const mapStateToProps= (storeState) => {

  return {
    paintings: storeState.paintings
  }
}


const mapDispatchToProps = {
  fetchPaintingsSuccess: fetchPaintingsSuccess,
  fetchPaintingsThunk: fetchPaintingsThunk
}


export default connect(mapStateToProps, mapDispatchToProps)(PaintingList);




















