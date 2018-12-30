/* eslint-disable import/prefer-default-export */
import { ADD_WAYPOINT, REMOVE_WAYPOINT } from '../config/action-types';

export const addWaypoint = payload => ({
      type: ADD_WAYPOINT,
      payload,
});

export const removeWaypoint = payload => ({
      type: REMOVE_WAYPOINT,
      payload,
});
