import React from 'react';
import Disruption from './Disruption';
import AddDisruption from './AddDisruption';

export default class MetroLine extends React.Component {
  getLineDisruptions() {
    return this.props.lineDisruptions.map((disruption, i) => {
      return (
        <Disruption
          key={i}
          disruption={disruption}
          handleDeleteDisruption={this.props.handleDeleteDisruption}
        />
      );
    });
  }

  render() {
    const lineDisruptions = this.getLineDisruptions();
    const className = `metro-line metro-line--${this.props.lineName.toLowerCase()}`;

    return (
      <div className={className}>
        <h4 className="metro-line__name">
          Line {this.props.lineNumber} - {this.props.lineName}
        </h4>
        {lineDisruptions}
        <AddDisruption
          lineNumber={this.props.lineNumber}
          handleAddDisruption={this.props.handleAddDisruption}
        />
      </div>
    );
  }
}
