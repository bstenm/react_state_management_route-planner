import './WaypointItem.css';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WaypointItem = ({ id, remove, onDragStart, draggedOn }) => (
      <li
            id={id}
            draggable="true"
            onDragStart={onDragStart}
            className={classNames('WaypointItem', { draggedOn })}
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
      draggedOn: PropTypes.bool.isRequired,
      onDragStart: PropTypes.func.isRequired,
};

export default WaypointItem;
