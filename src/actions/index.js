export function updatePosition(key, board) {
  return {
    type: 'UPDATE_POSITION',
    key: key.keyCode,
    board
  };
}
