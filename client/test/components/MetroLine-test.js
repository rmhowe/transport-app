import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import MetroLine from '../../src/js/components/MetroLine';

import Immutable from 'immutable';

describe("MetroLine", () => {
  it("shows a message when no disruptions are available", () => {
    const metroLine = shallow(
      <MetroLine
        lineNumber="1"
        lineName="Yonge-University"
        lineDisruptions={Immutable.List()}
      />
    );
    expect(metroLine.find('.metro-line__no-disruptions').length).to.equal(1);
  });
});
