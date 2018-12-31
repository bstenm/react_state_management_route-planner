import React from 'react';
import { shallow } from 'enzyme';
import Component from './WaypointItem';

let wrapper;
let props;

beforeEach(() => {
      props = {
            id: 9,
            remove: jest.fn(),
            draggedOn: false,
            onDragStart: jest.fn(),
      };
      wrapper = shallow(<Component {...props} />);
});

it('Displays a WaypointItem with the waypoint id + 1 as text', () => {
      const item = wrapper.find('li.WaypointItem');
      expect(item.length).toEqual(1);
      expect(item.text()).toContain(10);
});

// icon
it('Displays an icon to delete the item', () => {
      const icon = wrapper.find('i[title="remove"]');
      expect(icon.length).toEqual(1);
      // simulate click on delete icon
      icon.simulate('click');
      expect(props.remove).toHaveBeenCalledTimes(1);
      expect(props.remove).toHaveBeenCalledWith(9);
      icon.simulate('keyDown');
      expect(props.remove).toHaveBeenCalledTimes(2);
      expect(props.remove.mock.calls[1][0]).toEqual(9);
});

// list item prop: onDragStart
it('Passes a cb prop for the drag start event to list item component', () => {
      wrapper
            .find('li')
            .props()
            .onDragStart('arg');
      expect(props.onDragStart).toHaveBeenCalledTimes(1);
      expect(props.onDragStart).toHaveBeenCalledWith('arg');
});

it('Sets the class for item being dragged on', () => {
      expect(wrapper.find('li').props().className).toEqual('WaypointItem');
      wrapper.setProps({ draggedOn: true });
      expect(wrapper.find('li').props().className).toEqual(
            'WaypointItem draggedOn',
      );
});
