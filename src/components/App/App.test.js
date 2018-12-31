import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import Map from '../Map';
import WaypointPanel from '../WaypointPanel';
import LeafletApiLoader from '../LeafletApiLoader';
import GeoJsonDataProvider from '../GeoJsonDataProvider';

let wrapper;

beforeEach(() => {
      const mockStore = configureStore([]);
      const store = mockStore({});
      wrapper = mount(
            <Provider store={store}>
                  <App />
            </Provider>,
      );
});

it('Displays an App', () => {
      expect(wrapper.find('.App')).toHaveLength(1);
});

// GeoJsonDataProvider
it('Displays a GeoJsonDataProvider component', () => {
      expect(wrapper.find(GeoJsonDataProvider).length).toEqual(1);
});

// LeafletApiLoader
it('Displays a LeafletApiLoader component', () => {
      expect(
            wrapper.find(GeoJsonDataProvider).find(LeafletApiLoader).length,
      ).toEqual(1);
});

// Map
it('Displays a Map component', () => {
      expect(wrapper.find(LeafletApiLoader).find(Map).length).toEqual(1);
});

// Map prop: Leaflet
it('Passes Leaflet to Map component', () => {
      expect(wrapper.find(Map).props().Leaflet).toBeDefined();
});

// Map prop: updateGeoJsonData
it('Passes updateGeoJsonData to Map component', () => {
      const { updateGeoJsonData } = wrapper.find(Map).props();
      expect(updateGeoJsonData).toBeDefined();
      expect(updateGeoJsonData).toEqual(expect.any(Function));
});

// WaypointList
it('Displays a WaypointList component', () => {
      expect(
            wrapper.find(GeoJsonDataProvider).find(WaypointPanel).length,
      ).toEqual(1);
});
