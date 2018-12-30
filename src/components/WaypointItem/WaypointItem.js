import './WaypointItem.css';
import React from 'react';
import PropTypes from 'prop-types';

const WaypointItem = ({ id, remove }) => (
      <li id={id} className="WaypointItem">
            Waypoint {id + 1}
            <i
                  title="remove"
                  className="fas fa-trash-alt pull-right"
                  onClick={() => remove(id)}
                  // accessibility
                  onKeyDown={() => remove(id)}
                  // accessibility
                  role="button"
                  // accessibility
                  tabIndex="0"
            />
      </li>
);

WaypointItem.propTypes = {
      id: PropTypes.number.isRequired,
      remove: PropTypes.func.isRequired,
};

export default WaypointItem;
