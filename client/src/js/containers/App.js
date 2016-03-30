import React from 'react';
import Header from '../components/Header';
import MetroLine from '../components/MetroLine';

import Immutable from 'immutable';
import fetch from 'isomorphic-fetch';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.urlRoot = '//localhost:8080';
    this.state = {
      disruptions: Immutable.List()
    };
  }

  componentDidMount() {
    this.fetchDisruptions();
  }

  handleAddDisruption = (disruptionData) => {
    this.addDisruption(disruptionData).then(() => {
      this.fetchDisruptions();
    });
  };

  handleDeleteDisruption = (disruptionId) => {
    this.deleteDisruption(disruptionId).then(() => {
      this.fetchDisruptions();
    });
  };

  fetchDisruptions() {
    fetch(`${this.urlRoot}/disruptions/`).then((response) => {
      return response.json();
    }).then((disruptions) => {
      this.setState({
        disruptions: Immutable.fromJS(disruptions.data)
      });
    });
  }

  addDisruption(disruptionData) {
    return fetch(`${this.urlRoot}/disruptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(disruptionData)
    });
  }

  deleteDisruption(disruptionId) {
    return fetch(`${this.urlRoot}/disruptions/${disruptionId}`, {
      method: 'DELETE'
    });
  }

  getMetroLineData() {
    return {
      "1": "Yonge-University",
      "2": "Bloor-Danforth",
      "3": "Scarborough",
      "4": "Sheppard"
    };
  }

  getMetroLines(metroLineData) {
    return Object.keys(metroLineData).map((lineNumber) => {
      const lineDisruptions = this.state.disruptions.filter((disruption) => {
        return disruption.get('line_number') === lineNumber;
      });

      return (
        <MetroLine
          key={lineNumber}
          lineNumber={lineNumber}
          lineName={metroLineData[lineNumber]}
          lineDisruptions={lineDisruptions}
          handleAddDisruption={this.handleAddDisruption}
          handleDeleteDisruption={this.handleDeleteDisruption}
        />
      );
    });
  }

  render() {
    const metroLineData = this.getMetroLineData();
    const metroLines = this.getMetroLines(metroLineData);

    return (
      <div className="app">
        <Header/>
        {metroLines}
      </div>
    );
  }
}
