import React from 'react';
import { shallow } from 'enzyme';
import loadjs from 'loadjs';
import log from '../../services/Log';
import GoogleMapApiLoaderContainer from './GoogleMapApiLoaderContainer';

jest.mock('loadjs');

jest.mock('../../services/Log', () => ({
      error: jest.fn(),
}));

jest.mock('../../config', () => ({
      googleMapApi: {
            url: 'gma-url',
            version: 'gma-version',
      },
}));

// mock widow object
global.google = { maps: { gogleMap: 'api' } };

let props;
let wrapper;
let Component;

beforeEach(() => {
      Component = () => <div />;
      const WrappedComponent = GoogleMapApiLoaderContainer(Component);
      props = { random: 'prop' };
      loadjs.mockImplementation((_, options) => {
            // simulate Leaflet successfully loaded
            options.success();
      });
      wrapper = shallow(<WrappedComponent {...props} />);
});

it('Displays a GoogleMapApiLoader component', () => {
      expect(wrapper.find(Component).length).toEqual(1);
});

// Component prop: random
it('Passes its props to wrapped component', () => {
      expect(wrapper.find(Component).props().random).toEqual('prop');
});

// Load
it('Attempts to load the google map api', () => {
      const { googleMap } = wrapper.find(Component).props();

      expect(googleMap).toEqual({ gogleMap: 'api' });

      expect(loadjs).toHaveBeenCalledWith(
            'gma-url?key=MY_GOOGLE_API_KEY&v=gma-version&libraries=places',
            expect.objectContaining({
                  success: expect.any(Function),
                  error: expect.any(Function),
            }),
      );
});

// Success
it('Passes the Google Map Api to thhe wrapped component', () => {
      expect(wrapper.find(Component).props().googleMapError).toEqual(null);
      expect(wrapper.find(Component).props().googleMap).toEqual({
            gogleMap: 'api',
      });
});

// Error
it('Logs and passes an error if  the Google Map Api could not be loaded', () => {
      loadjs.mockImplementation((_, options) => {
            // simulate could not load Google Map Api
            options.error();
      });

      const WrappedComponent = GoogleMapApiLoaderContainer(Component);
      wrapper = shallow(<WrappedComponent {...props} />);

      expect(log.error).toHaveBeenCalledTimes(1);
      expect(wrapper.find(Component).props().googleMap).toEqual(null);
      expect(wrapper.find(Component).props().googleMapError).toEqual(
            expect.any(String),
      );
});
