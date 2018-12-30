import { combineReducers } from 'redux';
import waypointsReducer from './waypointList';

export default combineReducers({
      waypointList: waypointsReducer,
});
