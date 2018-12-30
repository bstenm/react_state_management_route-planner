import { addWaypoint, removeWaypoint, sortWaypoints } from './waypoints';
import {
      ADD_WAYPOINT,
      REMOVE_WAYPOINT,
      SORT_WAYPOINTS,
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
