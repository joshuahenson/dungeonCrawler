import React, { PropTypes } from 'react';

const Halls = ({ halls }) => (
  <div>
    {halls.map((hall, index) =>
      <div key={index} className="hall" style={{
        top: hall.y1 * 10,
        left: hall.x1 * 10,
        width: hall.x2 > hall.x1 ? (hall.x2 - hall.x1) * 10 : 10,
        height: hall.y2 > hall.y1 ? (hall.y2 - hall.y1) * 10 : 10,
        backgroundColor: hall.visible ? 'rgba(125, 125, 125, 0.7)' : 'black'
      }}
      />
    )}
  </div>
);

Halls.propTypes = {
  halls: PropTypes.array
};

export default Halls;
