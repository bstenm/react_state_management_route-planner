import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import Map from '../Map';
import LeafletApiLoader from '../LeafletApiLoader';

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

// LeafletApiLoader
it('Displays a LeafletApiLoader component', () => {
      expect(wrapper.find(LeafletApiLoader)).toHaveLength(1);
});

// Map
it('Displays a Map component', () => {
      expect(wrapper.find(LeafletApiLoader).find(Map).length).toEqual(1);
});

// Map prop: Leaflet
it('Passes Leaflet to Map component', () => {
      expect(wrapper.find(Map).props().Leaflet).toBeDefined();
});
