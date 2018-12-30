import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WaypointList from './WaypointList';
import { removeWaypoint } from '../../actions/waypoints';

// eslint-disable-next-line react/prefer-stateless-function
export class WaypointListContainer extends React.Component {
      render() {
            return (
                  <WaypointList
                        waypointList={this.props.waypointList}
                        removeWaypoint={this.props.removeWaypoint}
                  />
            );
      }
}

WaypointListContainer.defaultProps = {
      waypointList: [],
};

WaypointListContainer.propTypes = {
      waypointList: PropTypes.arrayOf(PropTypes.array.isRequired),
      removeWaypoint: PropTypes.func.isRequired,
};

export default connect(
      ({ waypointList }) => ({ waypointList }),
      { removeWaypoint },
)(WaypointListContainer);
