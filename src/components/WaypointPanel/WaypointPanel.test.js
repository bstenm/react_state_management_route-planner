import React from 'react';
import { shallow } from 'enzyme';
import WaypointPanel from './WaypointPanel';

let wrapper;
let props;

beforeEach(() => {
      props = {};
      wrapper = shallow(<WaypointPanel {...props} />);
});

it('Displays a WaypointPanel', () => {
      expect(wrapper.find('.WaypointPanel').length).toEqual(1);
});
