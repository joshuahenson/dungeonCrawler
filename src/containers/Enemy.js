import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateEnemyPosition } from '../actions/index';
import { bindActionCreators } from 'redux';

export default class Enemy extends Component {
  render() {
    return (
        <svg width="10" height="10" className="absolute"
          style={{
            top: this.props.location.y * 10,
            left: this.props.location.x * 10,
            opacity: this.props.active ? 1 : 0
          }}
        >
          <circle cx="5" cy="5" r="5" fill="purple" />
          <rect x="2" y="3" width="2" height="1" />
          <rect x="6" y="3" width="2" height="1" />
          <rect x="3" y="6" width="4" height="2" />
        </svg>
    );
  }
}

Enemy.propTypes = {
  location: PropTypes.object,
  active: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateEnemyPosition }, dispatch);
}

export default connect(null, mapDispatchToProps)(Enemy);
