import './WaypointItem.css';
import React from 'react';
import PropTypes from 'prop-types';

const WaypointItem = ({ id }) => (
      <li id={id} className="WaypointItem">
            Waypoint {id + 1}
      </li>
);

WaypointItem.propTypes = {
      id: PropTypes.number.isRequired,
};

export default WaypointItem;
