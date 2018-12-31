import React from 'react';
import { shallow } from 'enzyme';
import WaypointList from './WaypointList';
import { WaypointListContainer } from './WaypointListContainer';

let props;
let wrapper;
let getEventMock;

beforeEach(() => {
      getEventMock = idx => ({
            preventDefault: jest.fn(),
            target: { id: idx },
            dataTransfer: {
                  setData: jest.fn(),
                  getData: jest.fn(() => 3),
            },
      });
      props = {
            waypointList: [
                  ['lat1', 'lng1'],
                  ['lat2', 'lng2'],
                  ['lat3', 'lng3'],
                  ['lat4', 'lng4'],
                  ['lat5', 'lng5'],
            ],
            sortWaypoints: jest.fn(),
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
            ['lat3', 'lng3'],
            ['lat4', 'lng4'],
            ['lat5', 'lng5'],
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

// WaypointList prop: onDragStart
it('Passes a cb prop fot the drag start event to WaypointList component', () => {
      const eventMock = getEventMock(2);
      const { setData } = eventMock.dataTransfer;

      wrapper
            .find(WaypointList)
            .props()
            .onDragStart(eventMock);

      expect(setData).toHaveBeenCalledTimes(1);
      expect(setData).toHaveBeenCalledWith('text/plain', 2);
});

// WaypointList prop: onDragOver
it('Passes a cb prop for the drag over event to WaypointList component', () => {
      const eventMock = getEventMock(2);
      const { dataTransfer, preventDefault } = eventMock;
      wrapper
            .find(WaypointList)
            .props()
            .onDragOver(eventMock);

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(dataTransfer.dropEffect).toEqual('move');
});

// WaypointList prop: onDrop
it('Dispatches a sort waypoint action on drop item event', () => {
      const eventMock = getEventMock(1);
      const { preventDefault, dataTransfer } = eventMock;
      wrapper
            .find(WaypointList)
            .props()
            .onDrop(eventMock);

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(dataTransfer.getData).toHaveBeenCalledTimes(1);
      expect(dataTransfer.getData).toHaveBeenCalledWith('text/plain');

      expect(props.sortWaypoints).toHaveBeenCalledTimes(1);
      expect(props.sortWaypoints).toHaveBeenCalledWith({
            draggedId: 3,
            droppedOnId: 1,
      });
});

// WaypointList prop: onDrop
it('Dispatches a sort waypoint action with id of highest wayoint in list if user drops in the empty part of the waypoint panel', () => {
      // simulating dropping inside the dropzone but not aon a waypoin item
      const eventMock = getEventMock();
      const { preventDefault, dataTransfer } = eventMock;
      wrapper
            .find(WaypointList)
            .props()
            .onDrop(eventMock);

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(dataTransfer.getData).toHaveBeenCalledTimes(1);
      expect(dataTransfer.getData).toHaveBeenCalledWith('text/plain');

      expect(props.sortWaypoints).toHaveBeenCalledTimes(1);
      expect(props.sortWaypoints).toHaveBeenCalledWith({
            draggedId: 3,
            droppedOnId: 4,
      });
});

// WaypointList prop: onDrop
it('Does not dispatch a sort waypoint action on drop item event if the item dragged id is equal to the item dropped on id', () => {
      const eventMock = getEventMock(3);
      const { preventDefault, dataTransfer } = eventMock;
      wrapper
            .find(WaypointList)
            .props()
            .onDrop(eventMock);

      expect(preventDefault).toHaveBeenCalledTimes(1);

      expect(dataTransfer.getData).toHaveBeenCalledTimes(1);
      expect(dataTransfer.getData).toHaveBeenCalledWith('text/plain');

      expect(props.sortWaypoints).not.toHaveBeenCalled();
});
