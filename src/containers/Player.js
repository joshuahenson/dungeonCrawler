import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updatePosition,
  setHallVisibility,
  setRoomVisibility,
  toggleActiveRoom,
  foundHealth
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
  checkRoomVis(position, room, index, level) {
    if (position.x >= room.x1 && position.x < room.x2 &&
      position.y >= room.y1 && position.y < room.y2) { // player in room
      if (!room.visible) { // player in room but room isn't visible
        this.props.setRoomVisibility(index, level);
      }
      if (!room.active) { // player in room but room isn't active
        this.props.toggleActiveRoom(index, level);
      }
    } else if (room.active) { // player not in room but room is active
      this.props.toggleActiveRoom(index, level);
    }
  }
  checkHealthPack(playerPos, healthPos, index, level) {
    if (playerPos.x === healthPos.x && playerPos.y === healthPos.y) {
      this.props.foundHealth(index, level);
    }
  }
  checkStatus(position, level) {
    // check if position is in location and location is visible
    // check halls
    const halls = this.props.dungeon[this.props.level].halls;
    for (let i = 0; i < halls.length; i++) {
      if (!halls[i].visible && position.x >= halls[i].x1 &&
        position.x < halls[i].x2 && position.y === halls[i].y1 ||
        !halls[i].visible && position.y >= halls[i].y1 &&
        position.y < halls[i].y2 && position.x === halls[i].x1) {
        this.props.setHallVisibility(i, level);
      }
    }
    // check rooms
    const rooms = this.props.dungeon[level].rooms;
    for (const i in rooms) {
      if (rooms.hasOwnProperty(i)) {
        this.checkRoomVis(position, rooms[i], i, level);
        this.checkHealthPack(position, rooms[i].health.location, i, level);
      }
    }
  }
  checkPosition(key) {
    // check key direction and whether board is open
    // todo compare to enemy location
    let newPosition = null;
    const board = this.props.dungeon[this.props.level].board;
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
      this.checkStatus(newPosition, this.props.level);
    }
  }
  render() {
    return (
        <svg width="10" height="10" className="absolute"
          style={{
            top: this.props.location.y * 10,
            left: this.props.location.x * 10,
          }}
        >
          <circle cx="5" cy="5" r="5" fill="yellow" />
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
  dungeon: PropTypes.object,
  level: PropTypes.number,
  setHallVisibility: PropTypes.func,
  setRoomVisibility: PropTypes.func,
  toggleActiveRoom: PropTypes.func,
  foundHealth: PropTypes.func
};

function mapStateToProps(state) {
  return {
    location: state.player.location,
    dungeon: state.dungeon,
    level: state.dungeon.level
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updatePosition,
    setHallVisibility,
    setRoomVisibility,
    toggleActiveRoom,
    foundHealth
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
