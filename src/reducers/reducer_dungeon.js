const x1 = 2;
const y1 = 2;
const x2 = 30;
const y2 = 30;

const board = [];
for (let i = 0; i < 70; i++) {
  const row = [];
  for (let j = 0; j < 100; j++) {
    if (i >= x1 && i < x2 && j >= y1 && j < y2) {
      row.push(1);
    } else {
      row.push(0);
    }
  }
  board.push(row);
}

const initialState = {
  board,
  dimensions: {
    top: x1 * 10,
    left: y1 * 10,
    width: (x2 - x1) * 10,
    height: (y2 - y1) * 10
  }
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
