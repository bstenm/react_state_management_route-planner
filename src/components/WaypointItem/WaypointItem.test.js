import React from 'react';
import { shallow } from 'enzyme';
import Component from './WaypointItem';

describe('(Component) WaypointItem', () => {
      let wrapper;
      let props;

      beforeEach(() => {
            props = {
                  id: 9,
            };
            wrapper = shallow(<Component {...props} />);
      });

      it('Displays a WaypointItem with the waypoint id + 1 as text', () => {
            const item = wrapper.find('li.WaypointItem');
            expect(item.length).toEqual(1);
            expect(item.text()).toContain(10);
      });
});
