import React, { PropTypes } from 'react';

const determineBackground = (visible, active) => {
  if (visible) {
    if (active) {
      return 'rgba(255, 255, 0, 0.5)';
    } // else not active
    return 'rgba(255, 255, 0, 0.3)';
  } // else not visible
  return 'black';
};

const Rooms = ({ rooms }) => (
  <div>
    {rooms.map((room, index) =>
      <div key={index} className="room" style={{
        top: room.y1 * 10,
        left: room.x1 * 10,
        width: (room.x2 - room.x1) * 10,
        height: (room.y2 - room.y1) * 10,
        backgroundColor: determineBackground(room.visible, room.active)
      }}
      />
    )}
  </div>
);

Rooms.propTypes = {
  rooms: PropTypes.array
};

export default Rooms;
