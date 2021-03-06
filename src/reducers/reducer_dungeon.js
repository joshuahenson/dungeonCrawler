function initiateState() {
  // determine which room will have stairs going down.
  const stairsDownRooms = [
    0, // only room on level
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
    null
  ];
  const stairsUpRooms = [
    null,
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
    0
  ];
  const weaponRooms = {
    0: {
      room: 0,
      type: 'Club'
    },
    1: {
      room: Math.floor(Math.random() * 9),
      type: 'Dagger'
    },
    2: {
      room: Math.floor(Math.random() * 9),
      type: 'Sword'
    },
    3: {
      room: null,
      type: null
    },
    4: {
      room: null,
      type: null
    }
  };
  const initialState = { level: 0, stairsDownRooms, stairsUpRooms, visible: true };
  let occupied; // track spaces occupied by enemies and special items
  // determines order that halls connect rooms
  // create iife shuffled hall array with get method
  // I don't really need to do an iife but I want to anyway
  const shuffleHall = (function () {
    const oldArr = [
      [1, 2, 5, 8, 7, 6, 3, 0, 1, 4],
      [5, 8, 7, 6, 3, 0, 1, 2, 5, 4],
      [7, 6, 3, 0, 1, 2, 5, 8, 7, 4],
      [3, 0, 1, 2, 5, 8, 7, 6, 3, 4],
      [1, 2, 5, 8, 7, 6, 3, 0, 1, 4, 7],
      [5, 8, 7, 6, 3, 0, 1, 2, 5, 4, 3],
      [7, 6, 3, 0, 1, 2, 5, 8, 7, 4, 1],
      [3, 0, 1, 2, 5, 8, 7, 6, 3, 4, 5],
      [0, 1, 2, 5, 4, 3, 6, 7, 8],
      [2, 5, 8, 7, 4, 1, 0, 3, 6],
      [0, 1, 2, 5, 8, 7, 6, 3, 4],
      [2, 5, 8, 7, 6, 3, 0, 1, 4],
      [8, 7, 6, 3, 0, 1, 2, 5, 4],
      [6, 3, 0, 1, 2, 5, 8, 7, 4],
      [2, 5, 4, 1, 0, 3, 6, 7, 8],
      [8, 7, 4, 5, 2, 1, 0, 3, 6],
      [6, 3, 4, 7, 8, 5, 2, 1, 0],
      [0, 1, 4, 3, 6, 7, 8, 5, 2]
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
  // create random space for health items
  const initiateHealth = (x1, x2, y1, y2) => {
    if (Math.round(Math.random())) {
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
        x: -1000,
        y: -1000
      }
    };
  };
  // create random location for stairs
  const initiateStairs = (x1, x2, y1, y2, level, roomIndex, direction) => {
    if ((direction === 'down' && roomIndex === stairsDownRooms[level]) ||
    (direction === 'up' && roomIndex === stairsUpRooms[level])) {
      const x = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1; // keep 1 space away from edge
      const y = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1; // keep 1 space away from edge
      if (occupied.has(`${x}_${y}`)) {
        return initiateStairs(x1, x2, y1, y2, level, roomIndex, direction);
      }
      occupied.add(`${x}_${y}`);
      return {
        present: true,
        location: {
          x,
          y
        }
      };
    } // else return no stairs
    return {
      present: false,
      location: {
        x: -1000,
        y: -1000
      }
    };
  };
  // create random spot for weapons
  const initiateWeapons = (x1, x2, y1, y2, level, roomIndex) => {
    if (roomIndex === weaponRooms[level].room) {
      const x = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1; // keep 1 space away from edge
      const y = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1; // keep 1 space away from edge
      if (occupied.has(`${x}_${y}`)) {
        return initiateWeapons(x1, x2, y1, y2, level, roomIndex);
      }
      occupied.add(`${x}_${y}`);
      return {
        available: true,
        type: weaponRooms[level].type,
        location: {
          x,
          y
        }
      };
    } // else return no weapons
    return {
      available: false,
      type: 'None',
      location: {
        x: -1000,
        y: -1000
      }
    };
  };
  // **********************************
  // loop to create dungeon levels to populate state
  // **********************************
  for (let index = 0; index < 5; index++) {
    occupied = new Set();
    // returns an array of 9 rooms randomly sized in a 3x3 grid
    // range must cover middle of grid square to simplify aligning hallways
    const rooms = {};
    if (index > 0 && index < 4) {
      for (let i = 0; i < 9; i++) {
        const x1 = Math.ceil(Math.random() * 12) + ((i % 3) * 34);
        const x2 = (31 - Math.floor(Math.random() * 12)) + ((i % 3) * 34);
        const y1 = Math.ceil(Math.random() * 9) + (Math.floor(i / 3) * 24);
        const y2 = (21 - Math.floor(Math.random() * 9)) + (Math.floor(i / 3) * 24);
        const enemyX = Math.floor(Math.random() * (x2 - x1 - 2)) + x1 + 1;
        const enemyY = Math.floor(Math.random() * (y2 - y1 - 2)) + y1 + 1;
        occupied.add(`${enemyX}_${enemyY}`); // string because there is no .has() ability on objects
        rooms[i] = {
          x1,
          x2,
          y1,
          y2,
          visible: false,
          active: false,
          enemy: {
            alive: true,
            location: {
              x: enemyX,
              y: enemyY
            }
          },
          health: initiateHealth(x1, x2, y1, y2),
          stairsDown: initiateStairs(x1, x2, y1, y2, index, i, 'down'),
          stairsUp: initiateStairs(x1, x2, y1, y2, index, i, 'up'),
          weapon: initiateWeapons(x1, x2, y1, y2, index, i)
        };
      }
    } else {
      const enemyX = Math.floor(Math.random() * 58) + 21;
      const enemyY = Math.floor(Math.random() * 28) + 21;
      occupied.add(`${enemyX}_${enemyY}`); // string because there is no .has() ability on objects
      rooms[0] = {
        x1: 20,
        x2: 80,
        y1: 20,
        y2: 50,
        visible: !index,
        active: !index,
        enemy: {
          alive: index,
          location: {
            x: enemyX,
            y: enemyY
          }
        },
        health: {
          available: false,
          location: {
            x: -1000,
            y: -1000
          }
        },
        stairsDown: initiateStairs(20, 80, 20, 50, index, 0, 'down'),
        stairsUp: initiateStairs(20, 80, 20, 50, index, 0, 'up'),
        weapon: initiateWeapons(20, 80, 20, 50, index, 0)
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
    if (index > 0 && index < 4) { // no halls on level 0 or 4
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
  }
  return initialState;
}

const dungeon = (state = initiateState(), action) => {
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
    case 'DEFEATED_ENEMY':
      return Object.assign({}, state, {
        [action.level]: Object.assign({}, state[action.level], {
          rooms: Object.assign({}, state[action.level].rooms, {
            [action.index]: Object.assign({}, state[action.level].rooms[action.index], {
              enemy: Object.assign({}, state[action.level].rooms[action.index].enemy, {
                alive: false
              })
            })
          })
        })
      });
    case 'FOUND_WEAPON':
      return Object.assign({}, state, {
        [action.level]: Object.assign({}, state[action.level], {
          rooms: Object.assign({}, state[action.level].rooms, {
            [action.index]: Object.assign({}, state[action.level].rooms[action.index], {
              weapon: Object.assign({}, state[action.level].rooms[action.index].weapon, {
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
    case 'FOUND_STAIRS_UP':
      return Object.assign({}, state, {
        level: state.level - 1
      });
    case 'TOGGLE_DUNGEON_VIS':
      return Object.assign({}, state, {
        visible: !state.visible
      });
    case 'RESTART_GAME':
      return initiateState();
    default:
      return state;
  }
};

export default dungeon;
