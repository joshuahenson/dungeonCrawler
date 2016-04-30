const initialState = {
  location: {
    x: null,
    y: null
  },
  weapon: 'club',
  health: 100,
  xp: 0,
  level: 1
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSITION':
      return Object.assign({}, state, {
        location: action.position
      });
    default:
      return state;
  }
};

export default player;
