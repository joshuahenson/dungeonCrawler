import { combineReducers } from 'redux';

const keyModal = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_KEY_MODAL':
      return !state;
    case 'RESTART_GAME':
      return false;
    default:
      return state;
  }
};

const finishedModal = (state = { modal: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_FINISHED_MODAL':
      return {
        modal: !state.modal,
        title: action.title,
        message: action.message
      };
    case 'RESTART_GAME':
      return {
        modal: false
      };
    default:
      return state;
  }
};

const modal = combineReducers({
  keyModal,
  finishedModal
});

export default modal;
