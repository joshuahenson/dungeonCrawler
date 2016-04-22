const rooms = [];
for (let i = 0; i < 9; i++) {
  rooms[i] = {
    x1: Math.floor(Math.random() * 12) + ((i % 3) * 34),
    x2: (32 - Math.floor(Math.random() * 12)) + ((i % 3) * 34),
    y1: Math.floor(Math.random() * 9) + (Math.floor(i / 3) * 24),
    y2: (22 - Math.floor(Math.random() * 9)) + (Math.floor(i / 3) * 24),
    visible: true
  };
}

const hallOrder = [0, 1, 2, 5, 4, 3, 6, 7, 8];

// finds the shared horizontal range between two rooms
const findSharedY = (top1, top2, bottom1, bottom2) => {
  const top = Math.max(top1, top2);
  const bottom = Math.min(bottom1, bottom2);
  const rand = Math.floor(Math.random() * (bottom - top)) + top;
  return rand;
};
const findSharedX = (left1, left2, right1, right2) => {
  const left = Math.max(left1, left2);
  const right = Math.min(right1, right2);
  const rand = Math.floor(Math.random() * (right - left)) + left;
  return rand;
};

const halls = [];
for (let i = 0; i < hallOrder.length - 1; i++) {
	// console.log(hallOrder[i], hallOrder[i+1]);
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

// initiate board with 0's to start
const board = [];
for (let i = 0; i < 100; i++) {
  const row = [];
  for (let j = 0; j < 70; j++) {
    row.push(0);
  }
  board.push(row);
}

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 70; j++) {
    for (let k = 0, len = rooms.length; k < len; k++) {
      if (i >= rooms[k].x1 && i < rooms[k].x2 && j >= rooms[k].y1 && j < rooms[k].y2) {
        board[i][j] = 1;
      }
    }
  }
}
// halls - replace 0 with 1 to show it as being available
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
    default:
      return state;
  }
};

export default dungeon;
