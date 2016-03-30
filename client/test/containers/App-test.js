import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import App from '../../src/js/containers/App';

import Immutable from 'immutable';

describe("App", () => {
  let app;

  before(() => {
    app = mount(<App/>);
  });

  it("begins with no disruptions", () => {
    expect(app.state('disruptions').size).to.equal(0);
  });
});
