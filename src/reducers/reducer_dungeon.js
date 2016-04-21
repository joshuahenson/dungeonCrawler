// todo decide if I want to stick with this plan of decoupled display/board
// or map board to div/span

const rooms = [
  { x1: 2, y1: 2, x2: 30, y2: 30 },
  { x1: 42, y1: 2, x2: 70, y2: 30 }
];
const halls = [
  { x1: 30, y1: 10, x2: 42, y2: 10 }
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
    // case 'SAMPLE_ACTION':
    //   return !state;
    default:
      return state;
  }
};

export default dungeon;
