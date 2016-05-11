import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Rooms from '../components/Rooms';
import Halls from '../components/Halls';
import Overlay from '../components/Overlay';

class Dungeon extends Component {
  render() {
    return (
      <div className="dungeon">
        <Overlay visible={!this.props.dungeon.visible} />
        <Rooms rooms={ this.props.dungeon[this.props.level].rooms } level={ this.props.level } />
        <Halls halls={ this.props.dungeon[this.props.level].halls } />
        <Player />
      </div>
    );
  }
}

Dungeon.propTypes = {
  dungeon: PropTypes.object,
  level: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    dungeon: state.dungeon,
    level: state.dungeon.level
  };
}

export default connect(mapStateToProps)(Dungeon);
