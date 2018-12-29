import React from 'react';
import { shallow } from 'enzyme';
import loadjs from 'loadjs';
import cf from '../../config';
import { LeafletApiLoaderContainer } from './LeafletApiLoaderContainer';

jest.mock('loadjs', () =>
      jest.fn((endPoints, options) => {
            options.success();
      }),
);

// mock widow object
global.L = { map: 'api' };

let props;

beforeEach(() => {
      props = {
            children: jest.fn(),
      };
      shallow(<LeafletApiLoaderContainer {...props} />);
});

// loadjs
it('Attempts to load the Leaflet CSS and then its JS', () => {
      const { js, css } = cf.mapLib;
      expect(loadjs).toHaveBeenCalledWith(
            [css.endPoint, js.endPoint],
            expect.objectContaining({
                  success: expect.any(Function),
                  error: expect.any(Function),
            }),
      );
});

it('Calls the children prop with the leaflet api', () => {
      expect(props.children).toHaveBeenCalledWith({ Leaflet: { map: 'api' } });
});
