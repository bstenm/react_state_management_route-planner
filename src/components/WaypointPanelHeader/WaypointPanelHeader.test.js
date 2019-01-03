import React from 'react';
import togpx from 'togpx';
import { shallow } from 'enzyme';
import Component from './WaypointPanelHeader';

let wrapper;
let props;

beforeEach(() => {
      props = {
            geoJsonData: {
                  type: 'FeatureCollection',
                  features: [
                        {
                              type: 'Feature',
                              geometry: {
                                    type: 'Point',
                                    coordinates: ['lat', 'lng', 'ele'],
                              },
                        },
                  ],
            },
      };
      wrapper = shallow(<Component {...props} />);
});

it('Displays a WaypointPanelHeader', () => {
      expect(wrapper.find('.WaypointPanelHeader').length).toEqual(1);
});

// dowoad link
it('Displays a link to download the route gpx', () => {
      const link = wrapper.find('a[download="route.xml"]');
      expect(link).toHaveLength(1);
      expect(link.props().href).toContain(
            encodeURIComponent(
                  togpx({
                        type: 'FeatureCollection',
                        features: [
                              {
                                    type: 'Feature',
                                    geometry: {
                                          type: 'Point',
                                          coordinates: ['lat', 'lng', 'ele'],
                                    },
                              },
                        ],
                  }),
            ),
      );
});

// no dowoad link
it('Does not display a link to download the route gpx if no geo json data passed', () => {
      wrapper.setProps({ geoJsonData: { features: [] } });
      expect(wrapper.find('a[download="route.xml"]')).toHaveLength(0);
});
