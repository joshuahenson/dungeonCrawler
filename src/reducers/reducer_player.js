const initialState = {
  location: {
    x: null,
    y: null
  }
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
