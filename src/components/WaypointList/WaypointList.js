import './WaypointList.css';
import React from 'react';
import PropTypes from 'prop-types';
import WaypointItem from '../WaypointItem';

const WaypointList = ({ waypointList, removeWaypoint }) => (
      <div className="WaypointList">
            {waypointList.length ? (
                  <ul>
                        {waypointList.map(([lat], idx) => (
                              <WaypointItem id={idx} key={lat} remove={removeWaypoint} />
                        ))}
                  </ul>
            ) : (
                  <div className="guidelines">
                        Click on the map to add waypoint to your itinerary
                  </div>
            )}
      </div>
);

WaypointList.defaultProps = {
      waypointList: [],
};

WaypointList.propTypes = {
      waypointList: PropTypes.array,
      removeWaypoint: PropTypes.func.isRequired,
};

export default WaypointList;
