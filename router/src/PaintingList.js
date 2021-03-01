import React from 'react';
import DeleteablePainting from './DeleteablePainting';
import Painting from './Painting';
import artworks from './artworks';

class PaintingList extends React.Component {
  constructor(){
    super()
    this.state = {
      paintings: artworks
    }
  }

  handleVote = (id) => {
    this.setState(prevState => {
      return {
        paintings: prevState.paintings.map(p => {
          if (p.id !== id) {
            return p;
          } else {
            return { ...p, votes: p.votes + 1 };
          }
        })
      };
    });
  }

  renderPaintings = () => {
    return this.state.paintings.map(p => (
      <DeleteablePainting
        key={p.id}
        painting={p}
        handleVote={this.handleVote}
      />
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

export default PaintingList;












