const initialState = { level: 0 };
let occupied = new Set(); // track spaces occupied by enemies and special items
// determines order that halls connect rooms
// create iife shuffled hall array with get method
const shuffleHall = (function () {
  const oldArr = [ // todo add more possibilities
    [1, 2, 5, 8, 7, 6, 3, 0, 1, 4],
    [0, 1, 2, 5, 4, 3, 6, 7, 8],
    [0, 1, 2, 5, 8, 7, 6, 3, 4],
    [2, 5, 4, 1, 0, 3, 6, 7, 8]
  ];
  // originally used Fisher–Yates Shuffle but this is more performant
  // at least when not using full array
  const newArr = [[]];
  for (let i = 0; i < 3; i++) {
    newArr.push(oldArr.splice(Math.floor(Math.random() * oldArr.length), 1)[0]);
  }
  return {
    get: index => newArr[index]
  };
}());
const stairSelectRoom = [
  0,
  Math.floor(Math.random() * 9),
  Math.floor(Math.random() * 9),
  Math.floor(Math.random() * 9)
];
// create random space for health items
const initiateHealth = (x1, x2, y1, y2) => {
  if (Math.random() > 0.7) { // 0.7 or would i rather do n health and randomize placement?
    const x = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1; // keep 1 space away from edge
    const y = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1; // keep 1 space away from edge
    if (occupied.has(`${x}_${y}`)) {
      initiateHealth(x1, x2, y1, y2);
    } else {
      occupied.add(`${x}_${y}`);
      return {
        available: true,
        location: {
          x,
          y
        }
      };
    }
  } // else return no health pack
  return {
    available: false,
    location: {
      x: -1,
      y: -1
    }
  };
};
// create random location for stairs going down
const initiateStairsDown = (x1, x2, y1, y2, level, roomIndex) => {
  if (level < 3 && roomIndex === stairSelectRoom[level]) { // not called on level[0]
    const x = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1; // keep 1 space away from edge
    const y = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1; // keep 1 space away from edge
    if (occupied.has(`${x}_${y}`)) {
      initiateStairsDown(x1, x2, y1, y2, level);
    } else {
      occupied.add(`${x}_${y}`);
      return {
        present: true,
        location: {
          x,
          y
        },
      };
    }
  } // else return no stairs
  return {
    present: false,
    location: {
      x: -1,
      y: -1
    },
  };
};
// **********************************
// loop to create dungeon levels to populate state
// **********************************
for (let index = 0; index < 4; index++) {
  occupied = new Set();
  // returns an array of 9 rooms randomly sized in a 3x3 grid
  // range must cover middle of grid square to simplify aligning hallways
  const rooms = {};
  if (index > 0) {
    for (let i = 0; i < 9; i++) {
      const x1 = Math.ceil(Math.random() * 12) + ((i % 3) * 34); // ceil to keep off left border
      const x2 = (31 - Math.floor(Math.random() * 12)) + ((i % 3) * 34);
      const y1 = Math.floor(Math.random() * 9) + (Math.floor(i / 3) * 24);
      const y2 = (22 - Math.floor(Math.random() * 9)) + (Math.floor(i / 3) * 24);
      const enemyX = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1;
      const enemyY = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1;
      occupied.add(`${enemyX}_${enemyY}`); // string because there is no .has() ability on objects
      rooms[i] = {
        x1,
        x2,
        y1,
        y2,
        visible: true,
        active: true,
        enemy: {
          alive: true, // todo random whether room has enemy
          type: 'generic', // todo assign type?
          x: enemyX,
          y: enemyY
        },
        health: initiateHealth(x1, x2, y1, y2),
        stairsDown: initiateStairsDown(x1, x2, y1, y2, index, i)
      };
    }
  } else {
    rooms[0] = {
      x1: 20,
      x2: 80,
      y1: 20,
      y2: 50,
      visible: true,
      active: true,
      enemy: {
        alive: false,
        type: 'generic',
        x: -1,
        y: -1
      },
      health: {
        available: false,
        location: {
          x: -1,
          y: -1
        }
      },
      stairsDown: {
        present: true,
        location: {
          x: 50,
          y: 34
        },
      }
    };
  }
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
  const halls = {};
  if (index > 0) { // no halls on level 0
    const hallOrder = shuffleHall.get(index);
    for (let i = 0; i < hallOrder.length - 1; i++) {
      if (Math.abs(hallOrder[i] - hallOrder[i + 1]) === 1) { // horizontal hallway
        const sharedY = findSharedY(rooms[hallOrder[i]].y1,
          rooms[hallOrder[i + 1]].y1, rooms[hallOrder[i]].y2, rooms[hallOrder[i + 1]].y2);
        halls[i] = {
          x1: Math.min(rooms[hallOrder[i]].x2, rooms[hallOrder[i + 1]].x2) - 1,
          x2: Math.max(rooms[hallOrder[i]].x1, rooms[hallOrder[i + 1]].x1) + 1,
          y1: sharedY,
          y2: sharedY,
          visible: true
        };
      } else { // vertical
        const sharedX = findSharedX(rooms[hallOrder[i]].x1,
          rooms[hallOrder[i + 1]].x1, rooms[hallOrder[i]].x2, rooms[hallOrder[i + 1]].x2);
        halls[i] = {
          y1: Math.min(rooms[hallOrder[i]].y2, rooms[hallOrder[i + 1]].y2) - 1,
          y2: Math.max(rooms[hallOrder[i]].y1, rooms[hallOrder[i + 1]].y1) + 1,
          x1: sharedX,
          x2: sharedX,
          visible: true
        };
      }
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
      for (let k = 0, len = Object.keys(rooms).length; k < len; k++) {
        if (i >= rooms[k].x1 && i < rooms[k].x2 && j >= rooms[k].y1 && j < rooms[k].y2) {
          board[i][j] = 1;
        }
      }
    }
  }
  // inserts 1 in spaces covered by halls to show as valid space for movement
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 70; j++) {
      for (let k = 0, len = Object.keys(halls).length; k < len; k++) {
        if (i >= halls[k].x1 && i <= halls[k].x2 && j >= halls[k].y1 && j <= halls[k].y2) {
          board[i][j] = 1;
        }
      }
    }
  }
  initialState[index] = {
    board,
    rooms,
    halls
  };
} // end initiation loop

const dungeon = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HALL_VISIBILITY':
      return Object.assign({}, state, {
        [action.level]: Object.assign({}, state[action.level], {
          halls: Object.assign({}, state[action.level].halls, {
            [action.index]: Object.assign({}, state[action.level].halls[action.index], {
              visible: true
            })
          })
        })
      });
    case 'SET_ROOM_VISIBILITY':
      return Object.assign({}, state, {
        [action.level]: Object.assign({}, state[action.level], {
          rooms: Object.assign({}, state[action.level].rooms, {
            [action.index]: Object.assign({}, state[action.level].rooms[action.index], {
              visible: true
            })
          })
        })
      });
    case 'TOGGLE_ACTIVE_ROOM':
      return Object.assign({}, state, {
        [action.level]: Object.assign({}, state[action.level], {
          rooms: Object.assign({}, state[action.level].rooms, {
            [action.index]: Object.assign({}, state[action.level].rooms[action.index], {
              active: !state[action.level].rooms[action.index].active
            })
          })
        })
      });
    case 'FOUND_HEALTH':
      return Object.assign({}, state, {
        [action.level]: Object.assign({}, state[action.level], {
          rooms: Object.assign({}, state[action.level].rooms, {
            [action.index]: Object.assign({}, state[action.level].rooms[action.index], {
              health: Object.assign({}, state[action.level].rooms[action.index].health, {
                available: false
              })
            })
          })
        })
      });
    case 'FOUND_STAIRS_DOWN':
      return Object.assign({}, state, {
        level: state.level + 1
      });
    default:
      return state;
  }
};

export default dungeon;
