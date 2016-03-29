import React from 'react';
import ReactDOM from 'react-dom';
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
    let noDisruptionsMessage;
    if (lineDisruptions.size === 0) {
      noDisruptionsMessage = <span className="metro-line__no-disruptions">There are currently no service disruptions on this line</span>;
    }
    const className = `metro-line metro-line--${this.props.lineName.toLowerCase()}`;

    return (
      <div className={className}>
        <h4 className="metro-line__name">
          Line {this.props.lineNumber} - {this.props.lineName}
        </h4>
        {noDisruptionsMessage}
        {lineDisruptions}
        <AddDisruption
          lineNumber={this.props.lineNumber}
          handleAddDisruption={this.props.handleAddDisruption}
        />
      </div>
    );
  }
}
