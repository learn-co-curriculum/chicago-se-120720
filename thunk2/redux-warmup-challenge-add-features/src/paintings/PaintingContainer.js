import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaintingList from './PaintingList';
import PaintingShow from './PaintingShow';
import * as actions from '../actions';
// NOTE: actions is a directory.
// By default import will look for a file called index.js in any directory

class PaintingContainer extends Component {
  componentDidMount() {
    this.props.fetchPaintings(); }

  render() {
    return (
      <div className="row">
        <div className="six wide column">
          <PaintingList paintings={this.props.paintings} />
        </div>
        <div className="ten wide column">
          {this.props.activePainting ? (
            <PaintingShow painting={this.props.activePainting} />
          ) : (
            <h3>select a painting</h3>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paintings: state.paintings.filter( painting => painting.museum.name.includes(state.filter) ),
  activePainting: state.paintings.find(p => p.id === state.activePaintingId)
});

export default connect(mapStateToProps, actions)(PaintingContainer);













