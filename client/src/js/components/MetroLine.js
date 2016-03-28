import React from 'react';

export default class MetroLine extends React.Component {
  getLineDisruptions() {
    return this.props.lineDisruptions.map((disruption, i) => {
      return (
        <div
          key={i}
        >
          {disruption.get('disruption_text')}
        </div>
      );
    });
  }

  render() {
    const lineDisruptions = this.getLineDisruptions();
    const className = `metro-line metro-line--${this.props.lineName.toLowerCase()}`;

    return (
      <div className={className}>
        Line {this.props.lineNumber} - {this.props.lineName}
        {lineDisruptions}
      </div>
    );
  }
}
