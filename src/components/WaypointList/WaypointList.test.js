import React from 'react';
import { shallow } from 'enzyme';
import WaypointList from './WaypointList';
import WaypointItem from '../WaypointItem';

let wrapper;
let props;

beforeEach(() => {
      props = {
            onDrop: jest.fn(),
            onDragStart: jest.fn(),
            onDragOver: jest.fn(),
            removeWaypoint: jest.fn(),
            waypointList: [
                  ['lat1', 'lng1'],
                  ['lat2', 'lng2'],
                  ['lat3', 'lng3'],
            ],
      };
      wrapper = shallow(<WaypointList {...props} />);
});

it('Displays a WaypointList', () => {
      expect(wrapper.find('.WaypointList').length).toEqual(1);
});

// WaypointList prop: onDrop
it('Passes a cb prop fot the drop event to Waypoint component', () => {
      wrapper
            .find('.WaypointList')
            .props()
            .onDrop('arg');
      expect(props.onDrop).toHaveBeenCalledTimes(1);
      expect(props.onDrop).toHaveBeenCalledWith('arg');
});

// WaypointList prop: onDragOver
it('Passes a cb prop for the drag over event to Waypoint component', () => {
      wrapper
            .find('.WaypointList')
            .props()
            .onDragOver('arg');
      expect(props.onDragOver).toHaveBeenCalledTimes(1);
      expect(props.onDragOver).toHaveBeenCalledWith('arg');
});

// WaypointItem prop: onDragStart
it('Passes a cb prop for the drag start event to WaypointItem component', () => {
      wrapper
            .find(WaypointItem)
            .at(0)
            .props()
            .onDragStart('arg');
      expect(props.onDragStart).toHaveBeenCalledTimes(1);
      expect(props.onDragStart).toHaveBeenCalledWith('arg');
});

// WaypointItem
it('Displays a WaypointItem component for each item in the list', () => {
      expect(wrapper.find(WaypointItem)).toHaveLength(3);
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

// WaypointItem prop: id
it('Passes index of waypoint in list as id to WaypointItem component', () => {
      expect(
            wrapper
                  .find(WaypointItem)
                  .at(1)
                  .props().id,
      ).toEqual(1);
});

// WaypointItem prop: draggedOn
it('Passes boolean that sets wheteher that itemm is beign dragged on or not to WaypointItem component', () => {
      expect(
            wrapper
                  .find(WaypointItem)
                  .at(2)
                  .props().draggedOn,
      ).toEqual(false);

      // item at index 2 is now being dragged on
      wrapper.setProps({ draggedOnId: 2 });

      expect(
            wrapper
                  .find(WaypointItem)
                  .at(2)
                  .props().draggedOn,
      ).toEqual(true);
});
