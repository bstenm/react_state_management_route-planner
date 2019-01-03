import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WaypointList from './WaypointList';
import { removeWaypoint, sortWaypoints } from '../../actions/waypoints';

export class WaypointListContainer extends React.Component {
      state = { draggedOnId: null };

      onDragStart = e => {
            e.dataTransfer.setData('text/plain', e.target.id);
      };

      onDragOver = e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const id = parseInt(e.target.id, 10);

            if (this.state.draggedOnId !== id) {
                  this.setState({ draggedOnId: id });
            }
      };

      onDrop = e => {
            e.preventDefault();

            this.setState({ draggedOnId: null });

            const draggedId = e.dataTransfer.getData('text/plain');
            const droppedOnId = e.target.id;

            // do nothing if we drop item into itself
            if (draggedId === droppedOnId) return;

            // dispatch action
            this.props.sortWaypoints({ draggedId, droppedOnId });
      };

      render() {
            return (
                  <WaypointList
                        waypointList={this.props.waypointList}
                        removeWaypoint={this.props.removeWaypoint}
                        draggedOnId={this.state.draggedOnId}
                        onDragOver={this.onDragOver}
                        onDragStart={this.onDragStart}
                        onDrop={this.onDrop}
                  />
            );
      }
}

WaypointListContainer.defaultProps = {
      waypointList: [],
};

WaypointListContainer.propTypes = {
      waypointList: PropTypes.arrayOf(PropTypes.array.isRequired),
      sortWaypoints: PropTypes.func.isRequired,
      removeWaypoint: PropTypes.func.isRequired,
};

export default connect(
      ({ waypointList }) => ({ waypointList }),
      { removeWaypoint, sortWaypoints },
)(WaypointListContainer);
