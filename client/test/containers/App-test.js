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

  it("renders a div", () => {
    expect(app).contains(<div className="app" />).to.equal(true);
  });
});
