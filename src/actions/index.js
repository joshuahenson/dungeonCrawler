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

export function defeatedEnemy(index, level, message, health) {
  return {
    type: 'DEFEATED_ENEMY',
    message,
    index,
    level,
    health
  };
}

export function increaseSkill() {
  return {
    type: 'INCREASE_SKILL'
  };
}

export function toggleKeyModal() {
  return {
    type: 'TOGGLE_KEY_MODAL'
  };
}

export function toggleFinishedModal(title, message) {
  return {
    type: 'TOGGLE_FINISHED_MODAL',
    title,
    message
  };
}

export function restartGame() {
  return {
    type: 'RESTART_GAME'
  };
}
