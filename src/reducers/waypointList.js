import {
      ADD_WAYPOINT,
      REMOVE_WAYPOINT,
      SORT_WAYPOINTS,
} from '../config/action-types';

export default (state = [], { type, payload }) => {
      switch (type) {
            case ADD_WAYPOINT: {
                  return state.concat([payload]);
            }
            case REMOVE_WAYPOINT: {
                  return state.filter((e, idx) => idx !== payload);
            }
            case SORT_WAYPOINTS: {
                  const { draggedId, droppedOnId } = payload;
                  // clone original list
                  const listClone = [...state];
                  // remove the dragged item
                  const [draggedItem] = listClone.splice(draggedId, 1);
                  // before adding it again at the index on which it was dropped
                  listClone.splice(droppedOnId, 0, draggedItem);
                  return listClone;
            }
            default:
                  return state;
      }
};
