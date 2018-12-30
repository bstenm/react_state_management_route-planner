import React from 'react';
import { shallow } from 'enzyme';
import WaypointList from '../WaypointList';
import WaypointPanel from './WaypointPanel';

let wrapper;
let props;

beforeEach(() => {
      props = {};
      wrapper = shallow(<WaypointPanel {...props} />);
});

it('Displays a WaypointPanel', () => {
      expect(wrapper.find('.WaypointPanel')).toHaveLength(1);
});

it('Displays a WaypointList', () => {
      expect(wrapper.find(WaypointList).length).toEqual(1);
});
