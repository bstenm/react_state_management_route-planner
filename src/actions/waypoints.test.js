import {
      addWaypoint,
      removeWaypoint,
      sortWaypoints,
      updateWaypoint,
} from './waypoints';
import {
      ADD_WAYPOINT,
      REMOVE_WAYPOINT,
      SORT_WAYPOINTS,
      UPDATE_WAYPOINT,
} from '../config/action-types';

it('Dispatches an event for adding a waypoint', () => {
      expect(addWaypoint({ some: 'waypoint' })).toEqual({
            type: ADD_WAYPOINT,
            payload: { some: 'waypoint' },
      });
});

it('Dispatches an event to remove a waypoint', () => {
      expect(removeWaypoint(12)).toEqual({
            type: REMOVE_WAYPOINT,
            payload: 12,
      });
});

it('Dispatches an event to sort the waypoints', () => {
      const action = sortWaypoints({
            dragged: 12,
            droppedOn: 14,
      });
      expect(action).toEqual({
            type: SORT_WAYPOINTS,
            payload: {
                  dragged: 12,
                  droppedOn: 14,
            },
      });
});

it('Dispatches an event to update a waypoint lat and lng', () => {
      const action = updateWaypoint({
            idx: 2,
            data: ['lat', 'lng', 'ele'],
      });
      expect(action).toEqual({
            type: UPDATE_WAYPOINT,
            payload: {
                  idx: 2,
                  data: ['lat', 'lng', 'ele'],
            },
      });
});
