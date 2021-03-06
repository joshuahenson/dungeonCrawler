import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updatePosition,
  setHallVisibility,
  setRoomVisibility,
  toggleActiveRoom,
  foundHealth,
  foundStairsDown,
  foundStairsUp,
  toggleDungeonVis,
  updateMessage,
  foundWeapon,
  defeatedEnemy,
  increaseSkill,
  toggleFinishedModal
} from '../actions/index';
import { bindActionCreators } from 'redux';
import { throttle } from 'lodash';

class Player extends Component {
  constructor(props) {
    super(props);
    this.currentRoom = 0;
    // throttle helps with jank
    this.throttledKeydown = throttle(this.checkPosition.bind(this), 20, { trailing: false });
  }
  componentDidMount() {
    window.addEventListener('keydown', this.throttledKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.throttledKeydown);
  }
  checkRooms(position, room, index, level) {
    if (position.x >= room.x1 && position.x < room.x2 &&
      position.y >= room.y1 && position.y < room.y2) { // player in room
      if (!room.visible) { // player in room but room isn't visible
        this.props.setRoomVisibility(index, level);
      }
      if (!room.active) { // player in room but room isn't active
        this.props.toggleActiveRoom(index, level);
        this.currentRoom = index;
      }
    } else if (room.active) { // player not in room but room is active
      this.props.toggleActiveRoom(index, level);
      this.currentRoom = undefined;
    }
  }
  checkHealthPack(playerPos, healthPos, available, index, level) {
    if (playerPos.x === healthPos.x && playerPos.y === healthPos.y && available) {
      this.props.foundHealth(index, level);
      this.props.updateMessage('You found a health pack');
    }
  }
  checkSkill() {
    const xp = this.props.player.xp;
    const skill = this.props.player.skill;
    if (
    (xp > 269 && skill < 4) ||
    (xp > 179 && skill < 3) ||
    (xp > 89 && skill < 2)
    ) {
      this.props.increaseSkill();
    }
  }
  checkEnemy(playerPos, enemyPos, alive, index, level) {
    if (playerPos.x === enemyPos.x && playerPos.y === enemyPos.y && alive) {
      let enemyHealth = level * 50;
      let playerHealth = this.props.player.health;
      let message = 'You began battle with an enemy. ';
      const weaponMultiplier = {
        None: 0,
        Club: 1,
        Dagger: 2,
        Sword: 3
      }[this.props.player.weapon];
      let playerAttack;
      let enemyAttack;
      /* eslint no-constant-condition: 0 */
      while (true) {
        playerAttack = Math.floor(Math.random() * 11 * weaponMultiplier) +
          (this.props.player.skill * 20);
        enemyHealth -= playerAttack;
        message += `You strike doing ${playerAttack}
          damage leaving the enemy with ${enemyHealth} health. `;
        if (enemyHealth <= 0) {
          message += 'You have defeated the enemy!';
          this.props.defeatedEnemy(index, level, message, playerHealth);
          if (this.props.level === 4) {
            this.props.toggleFinishedModal(
              'Victory!',
              'You have rescued the prince.'
            );
          }
          break;
        }
        enemyAttack = Math.floor(Math.random() * 11) + (level * 3);
        playerHealth -= enemyAttack;
        message += `The enemy strikes doing ${enemyAttack}
          damage leaving you with ${playerHealth} health. `;
        if (playerHealth <= 0) {
          message += 'You have been defeated!';
          this.props.updateMessage(message);
          this.props.toggleFinishedModal(
            'Game Over!',
            'You have been killed. Defeating enemies in earlier levels builds ' +
            'experience to help you defeat enemies later on. Picking up better ' +
            'weapons also increases your attack'
          );
          break;
        }
      }
      this.checkSkill();
    }
  }
  checkWeapon(playerPos, weaponPos, available, weaponType, index, level) {
    if (playerPos.x === weaponPos.x && playerPos.y === weaponPos.y && available) {
      this.props.foundWeapon(index, level, weaponType);
      this.props.updateMessage(`You found a ${weaponType}`);
    }
  }
  takeStairsDown() {
    const level = this.props.level;
    const upLevel = this.props.level + 1;
    const pastRoom = this.props.dungeon.stairsDownRooms[level];
    const newRoom = this.props.dungeon.stairsUpRooms[upLevel];
    const newPos = this.props.dungeon[upLevel].rooms[newRoom].stairsUp.location;
    this.props.toggleDungeonVis();
    this.props.foundStairsDown();
    this.props.updatePosition(newPos);
    this.checkRooms(newPos, this.props.dungeon[level].rooms[pastRoom],
      pastRoom, level);
    this.checkRooms(newPos, this.props.dungeon[upLevel].rooms[newRoom], newRoom, upLevel);
    this.props.updateMessage(`You found stairs leading to level ${upLevel}`);
    setTimeout(() => this.props.toggleDungeonVis(), 400);
  }
  takeStairsUp() {
    const level = this.props.level;
    const downLevel = this.props.level - 1;
    const pastRoom = this.props.dungeon.stairsUpRooms[level];
    const newRoom = this.props.dungeon.stairsDownRooms[downLevel];
    const newPos = this.props.dungeon[downLevel].rooms[newRoom].stairsDown.location;
    this.props.toggleDungeonVis();
    this.props.foundStairsUp();
    this.props.updatePosition(newPos);
    this.checkRooms(newPos, this.props.dungeon[level].rooms[pastRoom],
      pastRoom, level);
    this.checkRooms(newPos, this.props.dungeon[downLevel].rooms[newRoom], newRoom, downLevel);
    this.props.updateMessage(`You found stairs leading to level ${downLevel}`);
    setTimeout(() => this.props.toggleDungeonVis(), 400);
  }
  checkStairs(playerPos, room) {
    if (playerPos.x === room.stairsDown.location.x && playerPos.y === room.stairsDown.location.y) {
      this.takeStairsDown();
    } else if (playerPos.x === room.stairsUp.location.x &&
      playerPos.y === room.stairsUp.location.y) {
      this.takeStairsUp();
    }
  }
  checkStatus(position, level) {
    // check if position is in location and location is visible
    // check halls
    const halls = this.props.dungeon[this.props.level].halls;
    for (const i in halls) {
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
        this.checkRooms(position, rooms[i], i, level);
      }
    }
    if (this.currentRoom >= 0) { // Don't bother checking in hallways(undefined)
      this.checkHealthPack(position, rooms[this.currentRoom].health.location,
        rooms[this.currentRoom].health.available, this.currentRoom, level);
      this.checkEnemy(position, rooms[this.currentRoom].enemy.location,
        rooms[this.currentRoom].enemy.alive, this.currentRoom, level);
      this.checkWeapon(position, rooms[this.currentRoom].weapon.location,
        rooms[this.currentRoom].weapon.available,
        rooms[this.currentRoom].weapon.type, this.currentRoom, level);
      this.checkStairs(position, rooms[this.currentRoom]);
    }
  }
  checkPosition(key) {
    // check key direction and whether board is open when state = playing
    if (this.props.playing) {
      let newPosition = null;
      const board = this.props.dungeon[this.props.level].board;
      const x = this.props.player.location.x;
      const y = this.props.player.location.y;
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
  }
  render() {
    return (
        <svg width="10" height="10" className="absolute"
          style={{
            top: this.props.player.location.y * 10,
            left: this.props.player.location.x * 10,
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
  player: PropTypes.object,
  updatePosition: PropTypes.func,
  dungeon: PropTypes.object,
  level: PropTypes.number,
  setHallVisibility: PropTypes.func,
  setRoomVisibility: PropTypes.func,
  toggleActiveRoom: PropTypes.func,
  foundHealth: PropTypes.func,
  foundStairsDown: PropTypes.func,
  foundStairsUp: PropTypes.func,
  toggleDungeonVis: PropTypes.func,
  updateMessage: PropTypes.func,
  foundWeapon: PropTypes.func,
  defeatedEnemy: PropTypes.func,
  increaseSkill: PropTypes.func,
  playing: PropTypes.bool,
  toggleFinishedModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    player: state.player,
    dungeon: state.dungeon,
    level: state.dungeon.level,
    playing: state.playing
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updatePosition,
    setHallVisibility,
    setRoomVisibility,
    toggleActiveRoom,
    foundHealth,
    foundStairsDown,
    foundStairsUp,
    toggleDungeonVis,
    updateMessage,
    foundWeapon,
    defeatedEnemy,
    increaseSkill,
    toggleFinishedModal
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
