import React, { Component } from 'react'


class WidgetSelector extends Component {
  render () {
    return (
      <div className="app-children">
       <button onClick={this.props.toggleWidget}> Toggle Widget</button>
      </div>
    )
  }
}

export default WidgetSelector
