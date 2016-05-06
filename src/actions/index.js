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

export function foundWeapon(index, level, weaponType) {
  return {
    type: 'FOUND_WEAPON',
    index,
    level,
    weaponType
  };
}

export function foundStairsDown() {
  return {
    type: 'FOUND_STAIRS_DOWN'
  };
}

export function foundStairsUp() {
  return {
    type: 'FOUND_STAIRS_UP'
  };
}

export function toggleDungeonVis() {
  return {
    type: 'TOGGLE_DUNGEON_VIS'
  };
}

export function updateMessage(message) {
  return {
    type: 'UPDATE_MESSAGE',
    message
  };
}
