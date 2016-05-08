import React, { PropTypes } from 'react';
import Enemy from './Enemy';
import Health from './Health';
import StairsDown from './StairsDown';
import StairsUp from './StairsUp';
import Weapon from './Weapon';

const determineBackground = (visible, active) => {
  if (visible) {
    if (active) {
      return 'rgba(255, 147, 41, 0.6)';
    } // else not active
    return 'rgba(125, 125, 125, 0.3)';
  } // else not visible
  return 'black';
};

const Rooms = ({ rooms }) => (
  <div>
    {Object.values(rooms).map((room, index) =>
      <div key={index}>
        <div className="room" style={{
          top: room.y1 * 10,
          left: room.x1 * 10,
          width: (room.x2 - room.x1) * 10,
          height: (room.y2 - room.y1) * 10,
          backgroundColor: determineBackground(room.visible, room.active)
        }}
        />
        {room.enemy.alive ?
          <Enemy active={room.active} location={room.enemy.location} /> :
          null}
        {room.health.available ? <Health health={room.health} active={room.active} /> : null}
        {room.weapon.available ? <Weapon weapon={room.weapon} active={room.active} /> : null}
        {room.stairsDown.present ?
          <StairsDown location={room.stairsDown.location} active={room.active} /> :
          null}
        {room.stairsUp.present ?
          <StairsUp location={room.stairsUp.location} active={room.active} /> :
          null}
      </div>
    )}
  </div>
);

Rooms.propTypes = {
  rooms: PropTypes.object
};

export default Rooms;
