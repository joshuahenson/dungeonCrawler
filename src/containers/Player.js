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
        <div className="player"
          style={{
            top: this.props.location.x * 10,
            left: this.props.location.y * 10,
          }}
        />
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
