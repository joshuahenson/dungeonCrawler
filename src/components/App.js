import React from 'react';
import Dungeon from '../containers/Dungeon';
import Info from '../containers/Info';
import Message from '../containers/Message';

const App = () => (
  <div>
    <Message />
    <Dungeon />
    <Info />
  </div>
);

export default App;
