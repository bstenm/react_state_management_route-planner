import React from 'react';
import { shallow } from 'enzyme';
import loadjs from 'loadjs';
import log from '../../services/Log';
import { LeafletApiLoaderContainer } from './LeafletApiLoaderContainer';

jest.mock('loadjs');

jest.mock('../../config', () => ({
      mapLib: {
            js: {
                  endPoint: 'LeafletJsEndpoint',
            },
            css: {
                  endPoint: 'LeafletCssEndpoint',
            },
      },
}));

jest.mock('../../services/Log', () => ({
      error: jest.fn(),
}));

// mock widow object
global.L = { map: 'api' };

let props;

beforeEach(() => {
      props = {
            children: jest.fn(),
      };
});

// loadjs
it('Attempts to load the Leaflet CSS and then its JS', () => {
      loadjs.mockImplementation((_, options) => {
            // simulate Leaflet successfully loaded
            options.success();
      });
      shallow(<LeafletApiLoaderContainer {...props} />);
      expect(loadjs).toHaveBeenCalledWith(
            ['LeafletCssEndpoint', 'LeafletJsEndpoint'],
            expect.objectContaining({
                  success: expect.any(Function),
                  error: expect.any(Function),
            }),
      );
});

// loadjs
it('Logs an error if  the Leaflet library could not be loaded', () => {
      loadjs.mockImplementation((_, options) => {
            // simulate could not load Leaflet
            options.error();
      });
      shallow(<LeafletApiLoaderContainer {...props} />);
      expect(log.error).toHaveBeenCalledTimes(1);
});

it('Calls the children prop with the leaflet api', () => {
      loadjs.mockImplementation((_, options) => {
            // simulate Leaflet successfully loaded
            options.success();
      });
      shallow(<LeafletApiLoaderContainer {...props} />);
      expect(props.children).toHaveBeenCalledWith({ Leaflet: { map: 'api' } });
});
