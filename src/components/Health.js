import React, { PropTypes } from 'react';

const Health = ({ health }) => (
  <div className="absolute"
    style={{
      top: health.y * 10,
      left: health.x * 10,
    }}
  >
    <svg>
      <rect x="0" y="0" width="10" height="10" fill="white" />
      <rect x="2" y="4" width="6" height="2" fill="red" />
      <rect x="4" y="2" width="2" height="6" fill="red" />
    </svg>
  </div>
);

Health.propTypes = {
  health: PropTypes.object
};

export default Health;
