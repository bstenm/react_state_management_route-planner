import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWaypoint } from '../../actions/waypoints';
import cf from '../../config';
import './MapContainer.css';

export class MapContainer extends React.Component {
      componentDidUpdate(prevProps) {
            const { Leaflet } = this.props;
            // initialse the map once the Leaflet lib has been loaded
            if (prevProps.Leaflet !== Leaflet) {
                  this.initialiseMap();
                  return;
            }

            // [OPTIMIZATION]: we could update markers only if the list from the redux store has changed
            // (we can not remove and add a new marker at the same time so comparing the length is good enough)
            if (this.map) {
                  this.updateMapMarkers();
            }
      }

      initialiseMap = () => {
            const { Leaflet } = this.props;
            const { latitude, longitude, zoom, tileLayer } = cf;
            const { url, ...rest } = tileLayer;

            // display map
            this.map = Leaflet.map(this.node);
            this.map.setView([latitude, longitude], zoom);

            // use tile layer from Mapbox (https://www.mapbox.com)
            Leaflet.tileLayer(url, {
                  ...rest,
                  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            }).addTo(this.map);

            this.map.on('click', e => {
                  const { lat, lng } = e.latlng;
                  const payload = [lat, lng];
                  // dispatch action
                  this.props.addWaypoint(payload);
            });
      };

      updateMapMarkers = () => {
            const latlngs = [];
            const markers = [];
            const { Leaflet, waypointList } = this.props;

            // clear all markers before re-adding the waypoints
            // we get from the redux store (no performance
            // issue noticed even with one hundred markers)
            if (this.markerGroup) {
                  this.markerGroup.clearLayers();
            }

            // re-add all the waypoints set in the redux store
            waypointList.forEach((coords, idx) => {
                  const blackDot = Leaflet.divIcon({
                        className: 'black-dot',
                        iconSize: cf.mapIconSize,
                        html: idx + 1,
                  });

                  // create a new Leaflet marker
                  const marker = Leaflet.marker(coords, { icon: blackDot });

                  // push into array to enable creation of a layer group
                  markers.push(marker);
                  latlngs.push(coords);
            });

            // defining a layer group allows us to clear all markers easily
            this.markerGroup = Leaflet.layerGroup(markers);

            // add a polyline between each marker if more than one
            if (latlngs.length > 1) {
                  const polyline = Leaflet.polyline(latlngs, {
                        color: cf.polyLineColor,
                        weight: cf.polylineWeight,
                  });
                  this.markerGroup.addLayer(polyline);
            }

            this.markerGroup.addTo(this.map);
      };

      render() {
            return (
                  <>
                        <div
                              ref={node => {
                                    this.node = node;
                              }}
                              className="MapContainer"
                        />
                        <div className="MapContainer__loader" />
                  </>
            );
      }
}

MapContainer.defaultProps = {
      Leaflet: null,
      waypointList: [],
};

MapContainer.propTypes = {
      Leaflet: PropTypes.object,
      waypointList: PropTypes.array,
      addWaypoint: PropTypes.func.isRequired,
};

export default connect(
      ({ waypointList }) => ({ waypointList }),
      { addWaypoint },
)(MapContainer);
