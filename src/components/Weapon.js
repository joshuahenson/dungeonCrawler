import React, { PropTypes } from 'react';

const Weapon = ({ weapon, active }) => (
  <svg width="10" height="10" className="absolute"
    style={{
      top: weapon.location.y * 10,
      left: weapon.location.x * 10,
      opacity: active ? 1 : 0
    }}
  >
    <rect x="0" y="0" width="10" height="10" fill="rgb(240,240,240)" />
    <rect x="4" y="1" width="2" height="8" fill="rgb(20,20,20)" />
    <rect x="3" y="6" width="4" height="1" fill="rgb(20,20,20)" />
  </svg>
);

Weapon.propTypes = {
  weapon: PropTypes.object,
  active: PropTypes.bool
};

export default Weapon;
