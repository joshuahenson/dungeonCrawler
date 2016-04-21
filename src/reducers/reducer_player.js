const initialState = {
  location: {
    x: 10,
    y: 27
  }
};

const updatePos = (board, x, y, key) => {
  // check key direction and whether board is open
  // todo compare to enemy location
  if (key === 37 && board[x][y - 1]) { // left
    return { x, y: y - 1 };
  }
  if (key === 38 && board[x - 1][y]) { // up
    return { x: x - 1, y };
  }
  if (key === 39 && board[x][y + 1]) { // right
    return { x, y: y + 1 };
  }
  if (key === 40 && board[x + 1][y]) { // down
    return { x: x + 1, y };
  }
  return { x, y };
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSITION':
      return Object.assign({}, state, {
        location: updatePos(action.board, state.location.x, state.location.y, action.key)
      });
    default:
      return state;
  }
};

export default player;

// if (e.keyCode == '38') {
//     // up arrow
// }
// else if (e.keyCode == '40') {
//     // down arrow
// }
// else if (e.keyCode == '37') {
//    // left arrow
// }
// else if (e.keyCode == '39') {
//    // right arrow
// }
