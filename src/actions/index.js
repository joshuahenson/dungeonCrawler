export function updatePosition(position) {
  return {
    type: 'UPDATE_POSITION',
    position
  };
}

export function setHallVisibility(index) {
  return {
    type: 'SET_HALL_VISIBILITY',
    index
  };
}

export function setRoomVisibility(index) {
  return {
    type: 'SET_ROOM_VISIBILITY',
    index
  };
}
