import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Info extends Component {
  render() {
    const player = this.props.player;
    const level = this.props.level;
    return (
      <div className="info">
        <div className="stats">
          <span>Dungeon Level: {level}</span>
          <span>Weapon: {player.weapon}</span>
          <span>Health: {player.health}</span>
          <span>Experience: {player.xp}</span>
          <span>Skill Level: {player.skill}</span>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  player: PropTypes.object,
  level: PropTypes.number
};

function mapStateToProps(state) {
  return {
    player: state.player,
    level: state.dungeon.level
  };
}

export default connect(mapStateToProps)(Info);
