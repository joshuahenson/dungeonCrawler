// todo trigger visible when player in room/hall
// change hall color when visible

const rooms = [
  { x1: 0, y1: 2, x2: 30, y2: 15, visible: true },
  { x1: 42, y1: 2, x2: 70, y2: 30, visible: false },
  { x1: 42, y1: 40, x2: 70, y2: 60, visible: false }
];
const halls = [
  { x1: 29, y1: 10, x2: 43, y2: 10, visible: false },
  { x1: 50, y1: 29, x2: 50, y2: 41, visible: false }
];

// initiate board with 0's to start
const board = [];
for (let i = 0; i < 70; i++) {
  const row = [];
  for (let j = 0; j < 100; j++) {
    row.push(0);
  }
  board.push(row);
}
// this makes sense as I'm adding to it but may be too hard to reason later on.
// rooms - replace 0 with 1 to show it as being available
for (let i = 0; i < 70; i++) {
  for (let j = 0; j < 100; j++) {
    for (let k = 0, len = rooms.length; k < len; k++) {
      if (i >= rooms[k].x1 && i < rooms[k].x2 && j >= rooms[k].y1 && j < rooms[k].y2) {
        board[j][i] = 1;
      }
    }
  }
}
// halls - replace 0 with 1 to show it as being available
for (let i = 0; i < 70; i++) {
  for (let j = 0; j < 100; j++) {
    for (let k = 0, len = halls.length; k < len; k++) {
      if (i >= halls[k].x1 && i <= halls[k].x2 && j >= halls[k].y1 && j <= halls[k].y2) {
        board[j][i] = 1;
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
