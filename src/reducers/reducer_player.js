const initialState = {
  location: {
    x: null,
    y: null
  },
  weapon: 'club',
  health: 10,
  xp: 0,
  level: 1
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSITION':
      return Object.assign({}, state, {
        location: action.position
      });
    case 'FOUND_HEALTH':
      return Object.assign({}, state, {
        health: state.health < 90 ? state.health + 10 : 100
      });
    default:
      return state;
  }
};

export default player;
