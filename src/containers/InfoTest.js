import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleFinishedModal } from '../actions/index';
import { bindActionCreators } from 'redux';

class Info extends Component {
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
        <button onClick = { () => this.props.toggleFinishedModal('title', 'message that is a little longer') }>Key</button>
      </div>
    );
  }
}

Info.propTypes = {
  player: PropTypes.object,
  level: PropTypes.number,
  toggleFinishedModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    player: state.player,
    level: state.dungeon.level
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleFinishedModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
