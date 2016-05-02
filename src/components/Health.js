import React, { PropTypes } from 'react';

const Health = ({ health, active }) => (
  <svg width="10" height="10" className="absolute"
    style={{
      top: health.location.y * 10,
      left: health.location.x * 10,
      opacity: active ? 1 : 0
    }}
  >
    <rect x="0" y="0" width="10" height="10" fill="white" />
    <rect x="2" y="4" width="6" height="2" fill="red" />
    <rect x="4" y="2" width="2" height="6" fill="red" />
  </svg>
);

Health.propTypes = {
  health: PropTypes.object,
  active: PropTypes.bool
};

export default Health;
