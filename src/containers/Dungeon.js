import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Rooms from '../components/Rooms';
import Halls from '../components/Halls';
// import { sampleAction } from '../actions/index';
// import { bindActionCreators } from 'redux';

export default class Dungeon extends Component {
  render() {
    return (
      <div className="dungeon">
        <Rooms rooms={ this.props.rooms } />
        <Halls halls={ this.props.halls } />
        <Player />
      </div>
    );
  }
}

Dungeon.propTypes = {
  rooms: PropTypes.array,
  halls: PropTypes.array,
  SampleAction: PropTypes.func
};

function mapStateToProps(state) {
  return {
    rooms: state.dungeon.rooms,
    halls: state.dungeon.halls
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ sampleAction }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dungeon);
export default connect(mapStateToProps)(Dungeon);
