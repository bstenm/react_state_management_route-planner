import reducer from './waypointList';
import { ADD_WAYPOINT, REMOVE_WAYPOINT } from '../config/action-types';

it('Returns the state unchanged if unknown action passed', () => {
      const state = [[-50.4, 29.5]];
      const actions = { type: 'UNKNOWN_ACTION' };
      expect(reducer(state, actions)).toEqual([[-50.4, 29.5]]);
});

it('Add a waypoint to array and give it highest id', () => {
      const waypoint = [-51.9, 31.8];
      const state = [[-50.4, 29.5]];
      const actions = { type: ADD_WAYPOINT, payload: waypoint };
      expect(reducer(state, actions)).toEqual([[-50.4, 29.5], [-51.9, 31.8]]);
});

it('Adds a waypoint to array and give it id of 1 if no waypoint added yet', () => {
      const waypoint = [-51.9, 31.8];
      const actions = { type: ADD_WAYPOINT, payload: waypoint };
      expect(reducer([], actions)).toEqual([[-51.9, 31.8]]);
});

it('Removes a waypoint from the array', () => {
      const state = [
            [-50.4, 29.5],
            [-51.9, 31.8],
            [-20.9, 20.8],
            [-30.9, 30.8],
            [-396.9, 176.8],
            [-9.9, 16.0],
      ];
      const actions = { type: REMOVE_WAYPOINT, payload: 2 };
      expect(reducer(state, actions)).toEqual([
            [-50.4, 29.5],
            [-51.9, 31.8],
            [-30.9, 30.8],
            [-396.9, 176.8],
            [-9.9, 16.0],
      ]);
});
