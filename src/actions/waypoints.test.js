import { addWaypoint, removeWaypoint } from './waypoints';
import { ADD_WAYPOINT, REMOVE_WAYPOINT } from '../config/action-types';

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
