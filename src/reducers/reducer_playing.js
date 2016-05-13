const playing = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_KEY_MODAL':
    case 'TOGGLE_FINISHED_MODAL':
    case 'RESTART_GAME':
      return !state;
    default:
      return state;
  }
};

export default playing;
