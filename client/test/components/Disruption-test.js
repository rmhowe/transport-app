import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Disruption from '../../src/js/components/Disruption';

import Immutable from 'immutable';

describe("Disruption", () => {
  let disruptionData;
  let disruption;

  before(() => {
    disruptionData = Immutable.Map();
    disruption = shallow(<Disruption disruption={disruptionData}/>);
  });

  it("renders a div", () => {
    expect(disruption).contains(<div className="disruption" />).to.equal(true);
  });
});
