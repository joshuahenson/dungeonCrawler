import { combineReducers } from 'redux';
import dungeon from './reducer_dungeon';
import player from './reducer_player';
import messages from './reducer_messages';
import modal from './reducer_modal';
import playing from './reducer_playing';

const rootReducer = combineReducers({
  dungeon,
  player,
  messages,
  modal,
  playing
});

export default rootReducer;
