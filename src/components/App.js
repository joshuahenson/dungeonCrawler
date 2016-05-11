import React from 'react';
import Dungeon from '../containers/Dungeon';
import Info from '../containers/Info';
import Message from '../containers/Message';
import KeyModal from '../containers/KeyModal';

const App = () => (
  <div>
    <Message />
    <Dungeon />
    <Info />
    <KeyModal />
  </div>
);

export default App;
