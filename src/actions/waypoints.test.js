import { addWaypoint } from './waypoints';
import { ADD_WAYPOINT } from '../config/action-types';

it('Dispatches an event for adding a waypoint', () => {
      expect(addWaypoint({ some: 'waypoint' })).toEqual({
            type: ADD_WAYPOINT,
            payload: { some: 'waypoint' },
      });
});
