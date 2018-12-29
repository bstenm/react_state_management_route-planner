import React from 'react';
import PropTypes from 'prop-types';
import cf from '../../config';
import './MapContainer.css';

export class MapContainer extends React.Component {
      componentDidUpdate(prevProps) {
            const { Leaflet } = this.props;
            // initialse the map once the Leaflet lib has been loaded
            if (prevProps.Leaflet !== Leaflet) {
                  this.initialiseMap();
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
};

MapContainer.propTypes = {
      Leaflet: PropTypes.object,
};

export default MapContainer;
