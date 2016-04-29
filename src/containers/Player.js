import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updatePosition,
  setHallVisibility,
  setRoomVisibility,
  toggleActiveRoom
} from '../actions/index';
import { bindActionCreators } from 'redux';

export default class Player extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkPosition.bind(this));
    this.props.updatePosition({ x: 16, y: 10 }); // placeholder to randomize later
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkPosition.bind(this));
  }
  checkStatus(position) {
    // check if position is in location and location is visible
    // check halls
    const halls = this.props.halls;
    for (let i = 0; i < halls.length; i++) {
      if (!halls[i].visible && position.x >= halls[i].x1 &&
        position.x < halls[i].x2 && position.y === halls[i].y1 ||
        !halls[i].visible && position.y >= halls[i].y1 &&
        position.y < halls[i].y2 && position.x === halls[i].x1) {
        this.props.setHallVisibility(i);
      }
    }
    // check rooms
    const rooms = this.props.rooms;
    for (let i = 0; i < rooms.length; i++) {
      if (position.x >= rooms[i].x1 && position.x < rooms[i].x2 &&
        position.y >= rooms[i].y1 && position.y < rooms[i].y2) { // player in room
        if (!rooms[i].visible) { // player in room but room isn't visible
          this.props.setRoomVisibility(i);
        }
        if (!rooms[i].active) { // player in room but room isn't active
          this.props.toggleActiveRoom(i);
        }
      } else if (rooms[i].active) { // player not in room but room is active
        this.props.toggleActiveRoom(i);
      }
    }
  }
  checkPosition(key) {
    // check key direction and whether board is open
    // todo compare to enemy location
    let newPosition = null;
    const board = this.props.board;
    const x = this.props.location.x;
    const y = this.props.location.y;
    if (key.keyCode === 37 && board[x - 1][y]) { // left
      newPosition = { x: x - 1, y };
    } else if (key.keyCode === 38 && board[x][y - 1]) { // up
      newPosition = { x, y: y - 1 };
    } else if (key.keyCode === 39 && board[x + 1][y]) { // right
      newPosition = { x: x + 1, y };
    } else if (key.keyCode === 40 && board[x][y + 1]) { // down
      newPosition = { x, y: y + 1 };
    }
    if (newPosition) {
      this.props.updatePosition(newPosition);
      this.checkStatus(newPosition);
    }
  }
  render() {
    return (
        <div className="player"
          style={{
            top: this.props.location.y * 10,
            left: this.props.location.x * 10,
          }}
        >
          <svg>
            <circle id="yellowcircle" cx="5" cy="5" r="5" fill="yellow" />
            <rect x="2" y="3" width="2" height="1" />
            <rect x="6" y="3" width="2" height="1" />
            <rect x="3" y="6" width="4" height="2" />
          </svg>
        </div>
    );
  }
}

Player.propTypes = {
  location: PropTypes.object,
  updatePosition: PropTypes.func,
  board: PropTypes.array,
  rooms: PropTypes.array,
  halls: PropTypes.array,
  setHallVisibility: PropTypes.func,
  setRoomVisibility: PropTypes.func,
  toggleActiveRoom: PropTypes.func
};

function mapStateToProps(state) {
  return {
    location: state.player.location,
    board: state.dungeon.board,
    rooms: state.dungeon.rooms,
    halls: state.dungeon.halls
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updatePosition,
    setHallVisibility,
    setRoomVisibility,
    toggleActiveRoom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
