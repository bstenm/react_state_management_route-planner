import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WaypointList from './WaypointList';

// eslint-disable-next-line react/prefer-stateless-function
export class WaypointListContainer extends React.Component {
      render() {
            return <WaypointList waypointList={this.props.waypointList} />;
      }
}

WaypointListContainer.defaultProps = {
      waypointList: [],
};

WaypointListContainer.propTypes = {
      waypointList: PropTypes.arrayOf(PropTypes.array.isRequired),
};

export default connect(({ waypointList }) => ({ waypointList }))(WaypointListContainer);
