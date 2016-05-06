const initialState = {
  location: {
    x: 45,
    y: 34
  },
  weapon: 'None',
  health: 10,
  xp: 0,
  skill: 1
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
    case 'FOUND_WEAPON':
      return Object.assign({}, state, {
        weapon: action.weaponType
      });
    default:
      return state;
  }
};

export default player;
