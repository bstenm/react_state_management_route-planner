import './WaypointItem.css';
import React from 'react';
import PropTypes from 'prop-types';

const WaypointItem = ({ id, remove, onDragStart }) => (
      <li
            id={id}
            draggable="true"
            onDragStart={onDragStart}
            className="WaypointItem"
      >
            <i className="fas fa-arrows-alt" title="move" />
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
      onDragStart: PropTypes.func.isRequired,
};

export default WaypointItem;
