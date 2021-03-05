import React from 'react';
import DeleteablePainting from './DeleteablePainting';
import Painting from './Painting';
import { fetchPaintingsSuccess } from '../actions/index'
import { connect } from 'react-redux'


class PaintingList extends React.Component {
  componentDidMount() {
    fetch('http://localhost:3000/paintings')
    .then(resp => resp.json())
    .then(paintings => {
      this.props.fetchPaintingsSuccess(paintings)
    })
  }

  renderPaintings = () => {
    return this.props.paintings.map(p => (
      <DeleteablePainting
        key={p.id}
        painting={p}
      />
    ));
  }

  render() {
    return (
        <div>
            <div>
                <h1>All Paintings</h1>
                <div className="ui items">
                  { this.renderPaintings()}
                </div>
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
  fetchPaintingsSuccess: fetchPaintingsSuccess
}



export default connect(mapStateToProps, mapDispatchToProps)(PaintingList)




