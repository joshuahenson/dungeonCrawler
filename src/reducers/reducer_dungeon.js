const occupied = new Set(); // track spaces occupied by enemies and special items

// create random space for health items
const initiateHealth = (x1, x2, y1, y2) => {
  if (Math.random() > 0.7) { // would i rather do n health and randomize placement?
    const x = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1; // keep 1 space away from edge
    const y = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1; // keep 1 space away from edge
    if (occupied.has(`${x}_${y}`)) {
      initiateHealth(x1, x2, y1, y2);
    } else {
      occupied.add(`${x}_${y}`);
      return {
        available: true,
        x,
        y
      };
    }
  } // else return no health pack
  return {
    available: false,
    x: -1,
    y: -1
  };
};

// returns an array of 9 rooms randomly sized in a 3x3 grid
// range must cover middle of grid square to simplify aligning hallways
const rooms = [];

for (let i = 0; i < 9; i++) {
  const x1 = Math.ceil(Math.random() * 12) + ((i % 3) * 34); // ceil to keep off left border
  const x2 = (31 - Math.floor(Math.random() * 12)) + ((i % 3) * 34);
  const y1 = Math.floor(Math.random() * 9) + (Math.floor(i / 3) * 24);
  const y2 = (22 - Math.floor(Math.random() * 9)) + (Math.floor(i / 3) * 24);
  const enemyX = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1; // keep 1 space away from edge
  const enemyY = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1; // keep 1 space away from edge
  occupied.add(`${enemyX}_${enemyY}`); // string because there is no real .has() ability on objects
  rooms[i] = {
    x1,
    x2,
    y1,
    y2,
    visible: false,
    active: false,
    enemy: {
      alive: true, // todo random whether room has enemy
      type: 'generic', // todo assign type?
      x: enemyX,
      y: enemyY
    },
    health: initiateHealth(x1, x2, y1, y2)
  };
}


// determines order that halls connect rooms
const hallOrder = [0, 1, 2, 5, 4, 3, 6, 7, 8];

// finds the shared horizontal range between two rooms
// and returns a random number in that range
const findSharedY = (top1, top2, bottom1, bottom2) => {
  const top = Math.max(top1, top2);
  const bottom = Math.min(bottom1, bottom2);
  const rand = Math.floor(Math.random() * (bottom - top)) + top;
  return rand;
};

// finds the shared vertical range between two rooms
// and returns a random number in that range
const findSharedX = (left1, left2, right1, right2) => {
  const left = Math.max(left1, left2);
  const right = Math.min(right1, right2);
  const rand = Math.floor(Math.random() * (right - left)) + left;
  return rand;
};

// returns an array of hallways that connect rooms
const halls = [];
for (let i = 0; i < hallOrder.length - 1; i++) {
  if (Math.abs(hallOrder[i] - hallOrder[i + 1]) === 1) { // horizontal hallway
    const sharedY = findSharedY(rooms[hallOrder[i]].y1,
      rooms[hallOrder[i + 1]].y1, rooms[hallOrder[i]].y2, rooms[hallOrder[i + 1]].y2);
    halls[i] = {
      x1: Math.min(rooms[hallOrder[i]].x2, rooms[hallOrder[i + 1]].x2) - 1,
      x2: Math.max(rooms[hallOrder[i]].x1, rooms[hallOrder[i + 1]].x1) + 1,
      y1: sharedY,
      y2: sharedY,
      visible: false
    };
  } else { // vertical
    const sharedX = findSharedX(rooms[hallOrder[i]].x1,
      rooms[hallOrder[i + 1]].x1, rooms[hallOrder[i]].x2, rooms[hallOrder[i + 1]].x2);
    halls[i] = {
      y1: Math.min(rooms[hallOrder[i]].y2, rooms[hallOrder[i + 1]].y2) - 1,
      y2: Math.max(rooms[hallOrder[i]].y1, rooms[hallOrder[i + 1]].y1) + 1,
      x1: sharedX,
      x2: sharedX,
      visible: false
    };
  }
}

// initiate board with 0's to start
const board = [];
for (let i = 0; i < 100; i++) {
  const row = [];
  for (let j = 0; j < 70; j++) {
    row.push(0);
  }
  board.push(row);
}

// inserts 1 in spaces covered by rooms to show as valid space for movement
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 70; j++) {
    for (let k = 0, len = rooms.length; k < len; k++) {
      if (i >= rooms[k].x1 && i < rooms[k].x2 && j >= rooms[k].y1 && j < rooms[k].y2) {
        board[i][j] = 1;
      }
    }
  }
}

// inserts 1 in spaces covered by halls to show as valid space for movement
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 70; j++) {
    for (let k = 0, len = halls.length; k < len; k++) {
      if (i >= halls[k].x1 && i <= halls[k].x2 && j >= halls[k].y1 && j <= halls[k].y2) {
        board[i][j] = 1;
      }
    }
  }
}

const initialState = {
  board,
  rooms,
  halls
};

const dungeon = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HALL_VISIBILITY':
      return Object.assign({}, state, {
        halls: [
          ...state.halls.slice(0, action.index),
          Object.assign({}, state.halls[action.index], {
            visible: true
          }),
          ...state.halls.slice(action.index + 1)
        ]
      });
    case 'SET_ROOM_VISIBILITY':
      return Object.assign({}, state, {
        rooms: [
          ...state.rooms.slice(0, action.index),
          Object.assign({}, state.rooms[action.index], {
            visible: true
          }),
          ...state.rooms.slice(action.index + 1)
        ]
      });
    case 'TOGGLE_ACTIVE_ROOM':
      return Object.assign({}, state, {
        rooms: [
          ...state.rooms.slice(0, action.index),
          Object.assign({}, state.rooms[action.index], {
            active: !state.rooms[action.index].active
          }),
          ...state.rooms.slice(action.index + 1)
        ]
      });
    default:
      return state;
  }
};

export default dungeon;
