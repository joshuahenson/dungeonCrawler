import { combineReducers } from 'redux';
import dungeon from './reducer_dungeon';
import player from './reducer_player';
import messages from './reducer_messages';

const rootReducer = combineReducers({
  dungeon,
  player,
  messages
});

export default rootReducer;
