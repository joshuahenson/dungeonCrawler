import React, { PropTypes } from 'react';

const StairsUp = ({ location, active }) => (
  <svg width="10" height="10" className="absolute"
    style={{
      top: location.y * 10,
      left: location.x * 10,
      opacity: active ? 1 : 0
    }}
  >
    <rect x="0" y="0" width="10" height="10" fill="rgb(20,20,20)" />
    <path d="M1 9 L5 9 L5 5 L9 5 L9 1" stroke="white" fill="none" />
  </svg>
);

StairsUp.propTypes = {
  location: PropTypes.object,
  active: PropTypes.bool
};

export default StairsUp;
