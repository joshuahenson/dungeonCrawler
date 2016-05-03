export function updatePosition(position) {
  return {
    type: 'UPDATE_POSITION',
    position
  };
}

export function setHallVisibility(index, level) {
  return {
    type: 'SET_HALL_VISIBILITY',
    index,
    level
  };
}

export function setRoomVisibility(index, level) {
  return {
    type: 'SET_ROOM_VISIBILITY',
    index,
    level
  };
}

export function toggleActiveRoom(index, level) {
  return {
    type: 'TOGGLE_ACTIVE_ROOM',
    index,
    level
  };
}

export function foundHealth(index, level) {
  return {
    type: 'FOUND_HEALTH',
    index,
    level
  };
}

export function foundStairsDown() {
  return {
    type: 'FOUND_STAIRS_DOWN'
  };
}
