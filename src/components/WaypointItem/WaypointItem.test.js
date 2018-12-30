import React from 'react';
import { shallow } from 'enzyme';
import Component from './WaypointItem';

describe('(Component) WaypointItem', () => {
      let wrapper;
      let props;

      beforeEach(() => {
            props = {
                  id: 9,
                  remove: jest.fn(),
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
            expect(props.remove.mock.calls.length).toEqual(1);
            expect(props.remove.mock.calls[0][0]).toEqual(9);
            icon.simulate('keyDown');
            expect(props.remove.mock.calls.length).toEqual(2);
            expect(props.remove.mock.calls[1][0]).toEqual(9);
      });
});
