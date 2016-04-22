import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePosition, setHallVisibility } from '../actions/index';
import { bindActionCreators } from 'redux';

export default class Player extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkPosition.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkPosition.bind(this));
  }
  checkVisibility(position) {
    // check if location is visible
    // check halls
    const halls = this.props.halls;
    for (let i = 0; i < halls.length; i++) {
      // check if position in hall
      console.log('pos x', position.x);
      console.log('pos y', position.y);
      console.log('halls', halls[i]);
      if (position.x >= halls[i].x1 && position.x <= halls[i].x2 && position.y >= halls[i].y1 && position.y <= halls[i].y2) {
        // check if visible
        console.log('checking vis');
        if (!halls[i].visible) {
          console.log('not visible');
          this.props.setHallVisibility(i);
          break;
        }
      }
    }
    // check rooms
  }
  checkPosition(key) {
    // check key direction and whether board is open
    // todo compare to enemy location
    let newPosition = null;
    const board = this.props.board;
    const x = this.props.location.x;
    const y = this.props.location.y;
    if (key.keyCode === 37 && board[x][y - 1]) { // left
      newPosition = { x, y: y - 1 };
    } else if (key.keyCode === 38 && board[x - 1][y]) { // up
      newPosition = { x: x - 1, y };
    } else if (key.keyCode === 39 && board[x][y + 1]) { // right
      newPosition = { x, y: y + 1 };
    } else if (key.keyCode === 40 && board[x + 1][y]) { // down
      newPosition = { x: x + 1, y };
    }
    if (newPosition) {
      this.props.updatePosition(newPosition);
      this.checkVisibility(newPosition);
    }
  }
  render() {
    return (
        <div className="player"
          style={{
            top: this.props.location.x * 10,
            left: this.props.location.y * 10,
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
  setHallVisibility: PropTypes.func
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
  return bindActionCreators({ updatePosition, setHallVisibility }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
