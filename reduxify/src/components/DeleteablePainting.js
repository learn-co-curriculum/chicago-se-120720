import React from 'react';
import Painting from './Painting';
import DeleteConfirmation from './DeleteConfirmation';

export default class DeleteablePainting extends React.Component {
  constructor() {
    super();

    this.state = {
      deleteView: false
    };
  }

  handleToggle = () => {
    this.setState({ deleteView: !this.state.deleteView });
  };

  render() {
    return this.state.deleteView ? (
      <DeleteConfirmation
        handleCancelClick={this.handleToggle}
        painting={this.props.painting}
      />
    ) : (
      <Painting
        painting={this.props.painting}
        handleDelete={this.handleToggle}
      />
    );
  }
}
