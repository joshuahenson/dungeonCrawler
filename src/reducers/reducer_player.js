const initialState = {
  location: {
    x: 45,
    y: 34
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
        health: state.health < 90 ? state.health + 10 : 100
      });
    case 'UPDATE_HEALTH':
      return Object.assign({}, state, {
        health: action.health
      });
    case 'FOUND_WEAPON':
      return Object.assign({}, state, {
        weapon: action.weaponType
      });
    case 'DEFEATED_ENEMY':
      return Object.assign({}, state, {
        xp: state.xp + 10
      });
    case 'INCREASE_SKILL':
      return Object.assign({}, state, {
        skill: state.skill + 1
      });
    default:
      return state;
  }
};

export default player;
