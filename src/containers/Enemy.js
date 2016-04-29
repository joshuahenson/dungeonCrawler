import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateEnemyPosition } from '../actions/index';
import { bindActionCreators } from 'redux';

export default class Enemy extends Component {
  render() {
    return (
        <div className="player" // todo change or rename?
          style={{
            top: this.props.status.y * 10,
            left: this.props.status.x * 10,
            opacity: this.props.status.alive && this.props.active ? 1 : 0
          }}
        >
          <svg>
            <circle cx="5" cy="5" r="5" fill="purple" />
            <rect x="2" y="3" width="2" height="1" />
            <rect x="6" y="3" width="2" height="1" />
            <rect x="3" y="6" width="4" height="2" />
          </svg>
        </div>
    );
  }
}

Enemy.propTypes = {
  status: PropTypes.object,
  active: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateEnemyPosition }, dispatch);
}

export default connect(null, mapDispatchToProps)(Enemy);
