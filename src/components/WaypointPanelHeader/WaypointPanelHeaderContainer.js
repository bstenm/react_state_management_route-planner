import React from 'react';
import { GeoJsonDataContext } from '../GeoJsonDataProvider';
import WaypointPanelHeader from './WaypointPanelHeader';

const WaypointPanelHeaderContainer = () => (
      <GeoJsonDataContext.Consumer>
            {({ geoJsonData }) => (
                  <WaypointPanelHeader geoJsonData={geoJsonData} />
            )}
      </GeoJsonDataContext.Consumer>
);

export default WaypointPanelHeaderContainer;
