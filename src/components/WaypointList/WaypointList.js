import './WaypointList.css';
import React from 'react';
import PropTypes from 'prop-types';
import WaypointItem from '../WaypointItem';

const WaypointList = ({
      waypointList,
      removeWaypoint,
      onDrop,
      onDragOver,
      onDragStart,
      draggedOnId,
}) => (
      <div onDrop={onDrop} onDragOver={onDragOver} className="WaypointList">
            {waypointList.length ? (
                  <ul>
                        {waypointList.map(([lat], idx) => (
                              <WaypointItem
                                    id={idx}
                                    key={lat}
                                    remove={removeWaypoint}
                                    onDragStart={onDragStart}
                                    draggedOn={draggedOnId === idx}
                              />
                        ))}
                  </ul>
            ) : (
                  <div className="guidelines">
                        Click on the map to add waypoints to your itinerary
                  </div>
            )}
      </div>
);

WaypointList.defaultProps = {
      waypointList: [],
      draggedOnId: null,
};

WaypointList.propTypes = {
      onDrop: PropTypes.func.isRequired,
      onDragOver: PropTypes.func.isRequired,
      draggedOnId: PropTypes.number,
      onDragStart: PropTypes.func.isRequired,
      waypointList: PropTypes.array,
      removeWaypoint: PropTypes.func.isRequired,
};

export default WaypointList;
