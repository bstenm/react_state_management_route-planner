/* eslint-disable prettier/prettier */
import { ADD_WAYPOINT } from '../config/action-types';

export default (state = [], { type, payload }) => {
      switch (type) {
      case ADD_WAYPOINT: {
            return state.concat([payload]);
      }
      default:
            return state;
      }
};
