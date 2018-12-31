import React from 'react';
import { shallow } from 'enzyme';
import GeoJsonDataProvider, { GeoJsonDataContext } from '.';

let wrapper;

beforeEach(() => {
      const props = {
            children: [],
      };
      wrapper = shallow(<GeoJsonDataProvider {...props} />);
});

// GeoJsonDataContext.Provider
it('Displays a GeoJsonDataContext.Provider component', () => {
      expect(wrapper.find(GeoJsonDataContext.Provider).length).toEqual(1);
});

//  prop: value.geoJsonData
it('Passes the geo json data to GeoJsonDataContext.Provider component', () => {
      const { value } = wrapper.find(GeoJsonDataContext.Provider).props();
      expect(value.geoJsonData).toEqual({});
});

//  prop: value.updateGeoJsonData
it('Passes a fn to update the geo json data to GeoJsonDataContext.Provider component', () => {
      const { value } = wrapper.find(GeoJsonDataContext.Provider).props();
      // simulate updating the geo json data
      value.updateGeoJsonData({ geoJson: 'data' });
      // we nned to re-assign since we updated the state
      const { geoJsonData } = wrapper
            .find(GeoJsonDataContext.Provider)
            .props().value;
      expect(geoJsonData).toEqual({ geoJson: 'data' });
});
