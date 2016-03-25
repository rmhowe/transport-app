import React from 'react';
import Header from '../components/Header';
import MetroLine from '../components/MetroLine';

export default class App extends React.Component {
  render() {
    const metroLineData = {
      1: "Yonge-University",
      2: "Bloor-Danforth",
      3: "Scarborough",
      4: "Sheppard"
    };

    const metroLines = Object.keys(metroLineData).map((lineNumber) => {
      return (
        <MetroLine
          key={lineNumber}
          lineNumber={lineNumber}
          lineName={metroLineData[lineNumber]}
        />
      );
    });

    return (
      <div className="app">
        <Header/>
        {metroLines}
      </div>
    );
  }
}
