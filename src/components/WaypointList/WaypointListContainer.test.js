import React from 'react';
import { shallow } from 'enzyme';
import WaypointList from './WaypointList';
import { WaypointListContainer } from './WaypointListContainer';

let props;
let wrapper;

beforeEach(() => {
      props = {
            waypointList: [['lat1', 'lng1'], ['lat2', 'lng2']],
            removeWaypoint: jest.fn(),
      };
      wrapper = shallow(<WaypointListContainer {...props} />);
});

// WaypointList Component
it('Displays a WaypointList component', () => {
      expect(wrapper.find(WaypointList).length).toEqual(1);
});

// WaypointList prop: waypointList
it('Passes the waypoint list to WaypointList component as prop', () => {
      expect(wrapper.find(WaypointList).props().waypointList).toEqual([
            ['lat1', 'lng1'],
            ['lat2', 'lng2'],
      ]);
});

// WaypointList prop: removeWaypoint
it('Passes a cb prop to remove a waypoint to WaypointList component', () => {
      wrapper
            .find(WaypointList)
            .props()
            .removeWaypoint(2);
      expect(props.removeWaypoint).toHaveBeenCalledTimes(1);
      expect(props.removeWaypoint).toHaveBeenCalledWith(2);
});
