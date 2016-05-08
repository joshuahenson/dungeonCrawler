import React, { PropTypes } from 'react';

const determineColor = (level) => {
  if (level === 1) {
    return 'blue';
  } else if (level === 2) {
    return 'green';
  }
  return 'red';
};

const Enemy = ({ location, active, level }) => (
  <svg width="10" height="10" className="absolute"
    style={{
      top: location.y * 10,
      left: location.x * 10,
      opacity: active ? 1 : 0
    }}
  >
    <circle cx="5" cy="5" r="5" fill={determineColor(level)} />
    <rect x="2" y="3" width="2" height="1" />
    <rect x="6" y="3" width="2" height="1" />
    <rect x="3" y="6" width="4" height="2" />
  </svg>
);

Enemy.propTypes = {
  location: PropTypes.object,
  active: PropTypes.bool,
  level: PropTypes.number
};

export default Enemy;
