import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePosition } from '../actions/index';
import { bindActionCreators } from 'redux';

export default class Player extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.updatePos.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.updatePos.bind(this));
  }
  updatePos(key) {
    this.props.updatePosition(key, this.props.board);
  }
  render() {
    return (
        <svg className="player"
          style={{
            top: this.props.location.x * 10,
            left: this.props.location.y * 10,
          }}
        >
          <circle id="yellowcircle" cx="5" cy="5" r="5" fill="yellow" />
          <rect x="2" y="3" width="2" height="1" />
          <rect x="6" y="3" width="2" height="1" />
          <rect x="3" y="6" width="4" height="2" />
        </svg>
    );
  }
}

Player.propTypes = {
  location: PropTypes.object,
  updatePosition: PropTypes.func,
  board: PropTypes.array
};

function mapStateToProps(state) {
  return {
    location: state.player.location,
    board: state.dungeon.board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePosition }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
