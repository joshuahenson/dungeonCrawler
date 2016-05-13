const initialState = ['Use the arrow keys to explore the dungeon and ' +
  'defeat the final enemy to rescue the prince.'];

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGE':
    case 'DEFEATED_ENEMY':
      return [
        ...state,
        action.message
      ];
    case 'RESTART_GAME':
      return [
        initialState
      ];
    default:
      return state;
  }
};

export default message;
