const initialState = ['Use the arrow keys to explore the dungeon.'];

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGE':
    case 'DEFEATED_ENEMY':
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

export default message;
