/* eslint-disable prettier/prettier */
import { ADD_WAYPOINT, REMOVE_WAYPOINT } from '../config/action-types';

export default (state = [], { type, payload }) => {
      switch (type) {
      case ADD_WAYPOINT: {
            return state.concat([payload]);
      }
      case REMOVE_WAYPOINT: {
            return state.filter((e, idx) => idx !== payload);
      }
      default:
            return state;
      }
};
