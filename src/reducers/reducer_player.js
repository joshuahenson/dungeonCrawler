const initialState = {
  location: {
    x: 50,
    y: 35
  },
  weapon: 'None',
  health: 100,
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
        health: state.health < 75 ? state.health + 25 : 100
      });
    case 'FOUND_WEAPON':
      return Object.assign({}, state, {
        weapon: action.weaponType
      });
    case 'DEFEATED_ENEMY':
      return Object.assign({}, state, {
        xp: state.xp + 10,
        health: action.health
      });
    case 'INCREASE_SKILL':
      return Object.assign({}, state, {
        skill: state.skill + 1
      });
    case 'RESTART_GAME':
      return initialState;
    default:
      return state;
  }
};

export default player;
