import React from 'react';
import Header from '../components/Header';
import MetroLine from '../components/MetroLine';

import Immutable from 'immutable';
import fetch from 'isomorphic-fetch';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disruptions: Immutable.List()
    };
  }

  componentDidMount() {
    fetch('//localhost:8000/disruptions/').then((response) => {
      return response.json();
    }).then((disruptions) => {
      this.setState({
        disruptions: Immutable.fromJS(disruptions.data)
      });
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
