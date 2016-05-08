import React, { PropTypes } from 'react';

const Enemy = ({ location, active }) => (
  <svg width="10" height="10" className="absolute"
    style={{
      top: location.y * 10,
      left: location.x * 10,
      opacity: active ? 1 : 0
    }}
  >
    <circle cx="5" cy="5" r="5" fill="purple" />
    <rect x="2" y="3" width="2" height="1" />
    <rect x="6" y="3" width="2" height="1" />
    <rect x="3" y="6" width="4" height="2" />
  </svg>
);

Enemy.propTypes = {
  location: PropTypes.object,
  active: PropTypes.bool
};

export default Enemy;
