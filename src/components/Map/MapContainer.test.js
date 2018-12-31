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
let mapObject;
let setViewMock;
let addLayerMock;
let clearLayersMock;
let polylineAddToMock;
let tileLayerAddToMock;
let layerGroupAddToMock;
let LeafletMock;

beforeEach(() => {
      setViewMock = jest.fn();
      addLayerMock = jest.fn();
      clearLayersMock = jest.fn();
      polylineAddToMock = jest.fn();
      tileLayerAddToMock = jest.fn();
      tileLayerAddToMock = jest.fn();
      layerGroupAddToMock = jest.fn();

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
            divIcon: jest.fn(),
            layerGroup: jest.fn(() => ({
                  addTo: layerGroupAddToMock,
                  addLayer: addLayerMock,
                  clearLayers: clearLayersMock,
            })),
            tileLayer: jest.fn(() => ({
                  addTo: tileLayerAddToMock,
            })),
            marker: jest.fn(),
            polyline: jest.fn(() => ({
                  addTo: polylineAddToMock,
            })),
      };

      props = {
            Leaflet: null,
            googleMap: null,
            waypointList: [],
            addWaypoint: jest.fn(),
      };
});

// MapContainer
it('Displays a MapContainer', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      expect(wrapper.find('.MapContainer')).toHaveLength(1);
});

// Loader
it('Displays a loader', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      expect(wrapper.find('.MapContainer__loader')).toHaveLength(1);
});

// Does not display map
it('Does not try to display a map if Leaflet API not loaded yet', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({ Leaflet: null, googleMap: {} });
      expect(LeafletMock.map.mock.calls.length).toEqual(0);
});

// Does not display map
it('Does not try to display a map if the Google Map API not loaded yet', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({ Leaflet: LeafletMock });
      expect(LeafletMock.map.mock.calls.length).toEqual(0);
});

// Displays a map
it('Uses Leaflet to display a map when Leaflet and Google Map Api are loaded', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({
            Leaflet: LeafletMock,
            googleMap: { some: 'api' },
      });

      expect(LeafletMock.map).toHaveBeenCalledTimes(1);

      // display map
      expect(mapObject.setView).toHaveBeenCalledTimes(1);
      expect(setViewMock).toHaveBeenCalledWith(
            ['latitude', 'longitude'],
            'zoom',
      );

      // tile layer provider called
      expect(LeafletMock.tileLayer).toHaveBeenCalledTimes(1);
      expect(LeafletMock.tileLayer).toHaveBeenCalledWith(
            'tileLayerApiEndPoint',
            {
                  id: 'tileLayerId',
                  maxZoom: 'tileLayerMaxZoom',
                  attribution: 'tileLayerAttribution',
                  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            },
      );

      // added to map
      expect(tileLayerAddToMock).toHaveBeenCalledTimes(1);
      expect(tileLayerAddToMock).toHaveBeenCalledWith(mapObject);
});

// Dispatches action to add waypoint
it('Dispatches an action with lat and lng and elevation of the new waypoint', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({
            Leaflet: LeafletMock,
            // mock the google map elevation api
            googleMap: {
                  ElevationService: class ElevationServiceMock {
                        getElevationForLocations = jest.fn((_, cb) => {
                              cb([{ elevation: 'elevation' }], 'OK');
                        });
                  },
            },
      });

      // simulate click event on map
      mapObject.fireClickEvent({
            latlng: { lat: 'lat', lng: 'lng' },
      });

      const { calls } = props.addWaypoint.mock;
      expect(calls.length).toEqual(1);
      expect(calls[0][0]).toEqual(['lat', 'lng', 'elevation']);
});

// Dispatches action to add waypoint
it('Displatches an action with only lat and lng if no elevation returned by google api', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({
            Leaflet: LeafletMock,
            // mock the google map elevation api
            googleMap: {
                  ElevationService: class ElevationServiceMock {
                        getElevationForLocations = jest.fn((_, cb) => {
                              cb(null, 'NOT OK');
                        });
                  },
            },
      });

      // simulate click event on map
      mapObject.fireClickEvent({
            latlng: { lat: 'lat', lng: 'lng' },
      });

      const { calls } = props.addWaypoint.mock;
      expect(calls.length).toEqual(1);
      expect(calls[0][0]).toEqual(['lat', 'lng']);
});

// Markers
describe('Update the markers on map click event', () => {
      let wrapper;

      beforeEach(() => {
            wrapper = shallow(<MapContainer {...props} />);
            wrapper.setProps({
                  Leaflet: LeafletMock,
                  googleMap: {
                        ElevationService: class ElevationServiceMock {
                              getElevationForLocations = () => null;
                        },
                  },
            });
      });

      // Add markers for each waypoint added and the polyline between them
      it('Adds a marker for each waypoint passed and the polyline between them', () => {
            wrapper.setProps({
                  waypointList: [['lat1', 'lng1'], ['lat2', 'lng2']],
            });

            expect(LeafletMock.divIcon).toHaveBeenCalledTimes(2);
            expect(LeafletMock.marker).toHaveBeenCalledTimes(2);

            // we arrange the markers into a layer group
            expect(LeafletMock.layerGroup).toHaveBeenCalledTimes(1);
            expect(LeafletMock.layerGroup.mock.calls[0][0].length).toEqual(2);

            // add a polyline
            expect(LeafletMock.polyline).toHaveBeenCalledTimes(1);
            expect(LeafletMock.polyline).toHaveBeenCalledWith(
                  [['lat1', 'lng1'], ['lat2', 'lng2']],
                  expect.any(Object),
            );

            // add the polylines to the layer group
            expect(addLayerMock).toHaveBeenCalledTimes(1);

            // add the layer group to map
            expect(layerGroupAddToMock).toHaveBeenCalledTimes(1);
      });

      // No polylines if only one marker
      it('Does not add polylines if only one waypoint entered', () => {
            wrapper.setProps({
                  waypointList: [['lat1', 'lng1']],
            });
            expect(LeafletMock.polyline).toHaveBeenCalledTimes(0);
      });

      // Clears previous markers before adding new ones
      it('Clear all markers from the map if any', () => {
            // simulate we add a marker
            wrapper.setProps({
                  waypointList: [['lat1', 'lng1']],
            });

            expect(clearLayersMock).toHaveBeenCalledTimes(0);

            // now we add new waypoints, but first the previous one should be cleared
            wrapper.setProps({
                  waypointList: [['lat1', 'lng1'], ['lat1', 'lng1']],
            });

            // this time it was called
            expect(clearLayersMock).toHaveBeenCalledTimes(1);
      });
});
