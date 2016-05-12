import { combineReducers } from 'redux';

const keyModal = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_KEY_MODAL':
      return !state;
    default:
      return state;
  }
};

const modal = combineReducers({
  keyModal
});

export default modal;
