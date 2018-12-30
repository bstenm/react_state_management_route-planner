import React from 'react';
import { shallow } from 'enzyme';
import WaypointList from './WaypointList';
import WaypointItem from '../WaypointItem';

describe('(Component) WaypointList', () => {
      let wrapper;
      let props;

      beforeEach(() => {
            props = {
                  waypointList: [['lat1', 'lng1'], ['lat2', 'lng2'], ['lat3', 'lng3']],
                  removeWaypoint: jest.fn(),
            };
            wrapper = shallow(<WaypointList {...props} />);
      });

      it('Displays a WaypointList', () => {
            expect(wrapper.find('.WaypointList').length).toEqual(1);
      });

      // WaypointItem
      it('Displays a WaypointItem component for each item in the list', () => {
            expect(wrapper.find(WaypointItem)).toHaveLength(3);
      });

      // WaypointItem prop: id
      it('Passes index of waypoint in list as id to WaypointItem component', () => {
            expect(
                  wrapper
                        .find(WaypointItem)
                        .at(1)
                        .props().id,
            ).toEqual(1);
      });

      // WaypointItem prop: remove
      it('Passes a cb prop to remove a marker to WaypointItem component', () => {
            wrapper
                  .find(WaypointItem)
                  .at(0)
                  .props()
                  .remove(12);
            expect(props.removeWaypoint).toHaveBeenCalledTimes(1);
            expect(props.removeWaypoint).toHaveBeenCalledWith(12);
      });
});
