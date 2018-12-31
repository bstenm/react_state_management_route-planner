import './WaypointPanelHeader.css';
import togpx from 'togpx';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const WaypointPanelHeader = ({ geoJsonData }) => (
      <div className="WaypointPanelHeader">
            Route Builder
            {!isEmpty(geoJsonData) && !isEmpty(geoJsonData.features) && (
                  <a
                        href={`data:text/xml;charset=utf-8,${encodeURIComponent(
                              togpx(geoJsonData),
                        )}`}
                        download="route.xml"
                  >
                        <i className="fa fa-download download-btn" />
                  </a>
            )}
      </div>
);

WaypointPanelHeader.propTypes = {
      geoJsonData: PropTypes.object.isRequired,
};

export default WaypointPanelHeader;
