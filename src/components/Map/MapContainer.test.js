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
let markerObject;
let addLayerMock;
let clearLayersMock;
let toGeoJSONMock;
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
      toGeoJSONMock = jest.fn(() => ({ geoJSON: 'data' }));

      let clickMapEventHandler = null;
      let dragEndEventHandler = null;

      mapObject = {
            fireClickEvent: e => {
                  clickMapEventHandler(e);
            },
            on: (_, handler) => {
                  clickMapEventHandler = handler;
            },
            setView: setViewMock,
      };

      markerObject = {
            fireDragEndEvent: e => {
                  dragEndEventHandler(e);
            },
            on: (_, handler) => {
                  dragEndEventHandler = handler;
            },
      };

      LeafletMock = {
            map: jest.fn(() => mapObject),
            divIcon: jest.fn(),
            layerGroup: jest.fn(() => ({
                  addTo: layerGroupAddToMock,
                  addLayer: addLayerMock,
                  clearLayers: clearLayersMock,
                  toGeoJSON: toGeoJSONMock,
            })),
            tileLayer: jest.fn(() => ({
                  addTo: tileLayerAddToMock,
            })),
            marker: jest.fn(() => markerObject),
            polyline: jest.fn(() => ({
                  addTo: polylineAddToMock,
            })),
      };

      props = {
            Leaflet: null,
            googleMap: null,
            waypointList: [],
            addWaypoint: jest.fn(),
            updateWaypoint: jest.fn(),
            updateGeoJsonData: jest.fn(),
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
      expect(LeafletMock.map).toHaveBeenCalledTimes(0);
});

// Does not display map
it('Does not try to display a map if the Google Map API not loaded yet', () => {
      const wrapper = shallow(<MapContainer {...props} />);
      wrapper.setProps({ Leaflet: LeafletMock });
      expect(LeafletMock.map).toHaveBeenCalledTimes(0);
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

      expect(props.addWaypoint).toHaveBeenCalledTimes(1);
      expect(props.addWaypoint).toHaveBeenCalledWith([
            'lat',
            'lng',
            'elevation',
      ]);
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
                              getElevationForLocations = (_, cb) => {
                                    cb([{ elevation: 'newElevation' }], 'OK');
                              };
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

            // update the geo json data held in react context
            expect(toGeoJSONMock).toHaveBeenCalledTimes(1);
            expect(props.updateGeoJsonData).toHaveBeenCalledTimes(1);
            expect(props.updateGeoJsonData).toHaveBeenCalledWith({
                  geoJSON: 'data',
            });
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

      it('Updates the marker data on drag and drop', () => {
            wrapper.setProps({
                  waypointList: [['lat1', 'lng1']],
            });

            expect(LeafletMock.marker).toHaveBeenCalledTimes(1);

            markerObject.fireDragEndEvent({
                  target: { _latlng: { lat: 'newLat', lng: 'newLng' } },
            });

            expect(props.updateWaypoint).toHaveBeenCalledTimes(1);
            expect(props.updateWaypoint).toHaveBeenCalledWith({
                  data: ['newLat', 'newLng', 'newElevation'],
                  idx: 0,
            });
      });
});
