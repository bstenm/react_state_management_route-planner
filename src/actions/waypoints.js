/* eslint-disable import/prefer-default-export */
import { ADD_WAYPOINT } from '../config/action-types';

export const addWaypoint = payload => ({
      type: ADD_WAYPOINT,
      payload,
});
