import React from 'react';

export default class MetroLine extends React.Component {
  render() {
    return (
      <div className={`metro-line metro-line--${this.props.lineName.toLowerCase()}`}>
        Metro Line {this.props.lineNumber} {this.props.lineName}
      </div>
    );
  }
}
