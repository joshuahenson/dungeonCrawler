import React, { PropTypes } from 'react';

const Overlay = ({ visible }) => (
  <div className="dungeon overlay"
    style={ visible ? { opacity: 1, transition: 'none' } : { opacity: 0 }}
  />
);

Overlay.propTypes = {
  visible: PropTypes.bool
};

export default Overlay;
