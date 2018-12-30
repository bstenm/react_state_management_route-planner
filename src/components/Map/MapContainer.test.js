import React from 'react';
import { shallow } from 'enzyme';
import { MapContainer } from './MapContainer';

// mock the config
jest.mock('../../config', () => ({
      mapLib: {
            js: {
                  endPoint: 'mapLibJsEndPoint',
                  integrity: 'mapLibJsIntegrity',
            },
            css: {
                  endPoint: 'mapLibCssEndPoint',
                  integrity: 'mapLibCssIntegrity',
            },
      },
      tileLayer: {
            id: 'tileLayerId',
            url: 'tileLayerApiEndPoint',
            maxZoom: 'tileLayerMaxZoom',
            attribution: 'tileLayerAttribution',
      },
      latitude: 'latitude',
      longitude: 'longitude',
      zoom: 'zoom',
      polyLineColor: 'color',
}));

let props;
let setViewMock;
let mapObject;
let tileLayerAddToMock;
let LeafletMock;

beforeEach(() => {
      setViewMock = jest.fn();
      tileLayerAddToMock = jest.fn();

      let clickEventHandler = null;

      mapObject = {
            fireClickEvent: e => {
                  clickEventHandler(e);
            },
            on: (event, handler) => {
                  clickEventHandler = handler;
            },
            setView: setViewMock,
      };

      LeafletMock = {
            map: jest.fn(() => mapObject),
            tileLayer: jest.fn(() => ({
                  addTo: tileLayerAddToMock,
            })),
      };

      props = {
            Leaflet: null,
            addWaypoint: jest.fn(),
      };
});

// MapContainer
it('Displays a MapContainer', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      expect(wrapper.find('.MapContainer').length).toEqual(1);
});

// Loader
it('Displays a loader', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      expect(wrapper.find('.MapContainer__loader').length).toEqual(1);
});

// Does not display map
it('Does not try to display a map if Leaflet API not loaded yet', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({ Leaflet: null, googleMap: {} });
      expect(LeafletMock.map.mock.calls.length).toEqual(0);
});

// Displays a map
it('Uses Leaflet to display a map when Leaflet is loaded', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({
            Leaflet: LeafletMock,
      });

      expect(LeafletMock.map.mock.calls.length).toEqual(1);

      // display map
      expect(mapObject.setView.mock.calls.length).toEqual(1);
      expect(setViewMock.mock.calls[0][0]).toEqual(['latitude', 'longitude']);
      expect(setViewMock.mock.calls[0][1]).toEqual('zoom');

      // tile layer provider called
      const tileLayerMockCalls = LeafletMock.tileLayer.mock.calls;
      expect(tileLayerMockCalls.length).toEqual(1);
      expect(tileLayerMockCalls[0][0]).toEqual('tileLayerApiEndPoint');
      expect(tileLayerMockCalls[0][1].id).toEqual('tileLayerId');
      expect(tileLayerMockCalls[0][1].maxZoom).toEqual('tileLayerMaxZoom');
      expect(tileLayerMockCalls[0][1].attribution).toEqual('tileLayerAttribution');
      expect(tileLayerMockCalls[0][1].accessToken).toEqual(
            process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      );

      // added to map
      expect(tileLayerAddToMock.mock.calls.length).toEqual(1);
      expect(tileLayerAddToMock.mock.calls[0][0]).toEqual(mapObject);
});

// Dispatches action to add waypoint
it('Displatches an action with lat and lng of new waypoint', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({
            Leaflet: LeafletMock,
      });

      // simulate click event on map
      mapObject.fireClickEvent({
            latlng: { lat: 'lat', lng: 'lng' },
      });

      const { calls } = props.addWaypoint.mock;
      expect(calls.length).toEqual(1);
      expect(calls[0][0]).toEqual(['lat', 'lng']);
});
