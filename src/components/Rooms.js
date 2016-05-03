import React, { PropTypes } from 'react';
import Enemy from '../containers/Enemy';
import Health from './Health';
import StairsDown from './StairsDown';

const determineBackground = (visible, active) => {
  if (visible) {
    if (active) {
      return 'rgba(255, 255, 0, 0.4)';
    } // else not active
    return 'rgba(255, 255, 0, 0.1)';
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
        <Enemy active={room.active} status={room.enemy} id={index} />
        {room.health.available ? <Health health={room.health} active={room.active} /> : null}
        {room.stairsDown.present ?
          <StairsDown location={room.stairsDown.location} active={room.active} /> :
          null}
      </div>
    )}
  </div>
);

Rooms.propTypes = {
  rooms: PropTypes.object
};

export default Rooms;
