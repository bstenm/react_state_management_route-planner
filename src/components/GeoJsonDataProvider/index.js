import React from 'react';
import PropTypes from 'prop-types';

export const GeoJsonDataContext = React.createContext({});

export default class GeoJsonDataProvider extends React.Component {
      state = { geoJsonData: {} };

      updateGeoJsonData = geoJsonData => {
            this.setState(() => ({ geoJsonData }));
      };

      render() {
            return (
                  <GeoJsonDataContext.Provider
                        value={{
                              ...this.state,
                              updateGeoJsonData: this.updateGeoJsonData,
                        }}
                  >
                        {this.props.children}
                  </GeoJsonDataContext.Provider>
            );
      }
}

GeoJsonDataProvider.propTypes = {
      children: PropTypes.array.isRequired,
};
