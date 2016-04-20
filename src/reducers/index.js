import { combineReducers } from 'redux';
import dungeon from './reducer_dungeon';
import player from './reducer_player';

const rootReducer = combineReducers({
  dungeon,
  player
});

export default rootReducer;
