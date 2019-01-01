import {
      ADD_WAYPOINT,
      REMOVE_WAYPOINT,
      SORT_WAYPOINTS,
      UPDATE_WAYPOINT,
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

            case UPDATE_WAYPOINT: {
                  const { idx, data } = payload;
                  // clone original list
                  const listClone = [...state];
                  // remove the original data
                  listClone.splice(idx, 1);
                  // before adding the new data
                  listClone.splice(idx, 0, data);
                  return listClone;
            }

            default:
                  return state;
      }
};
