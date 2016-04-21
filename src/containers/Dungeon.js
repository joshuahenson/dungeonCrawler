import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
// import { sampleAction } from '../actions/index';
// import { bindActionCreators } from 'redux';

export default class Dungeon extends Component {
  render() {
    return (
      <div className="dungeon">
        { this.props.rooms.map((room, index) =>
          <div key={index} className="room" style={{
            top: room.y1 * 10,
            left: room.x1 * 10,
            width: (room.y2 - room.y1) * 10,
            height: (room.x2 - room.x1) * 10
          }}
          />
        ) }
        { this.props.halls.map((hall, index) =>
          <div key={index} className="hall" style={{
            top: hall.y1 * 10,
            left: hall.x1 * 10,
            width: hall.x2 > hall.x1 ? (hall.x2 - hall.x1) * 10 : 10,
            height: hall.y2 > hall.y1 ? (hall.y2 - hall.y1) * 10 : 10
          }}
          />
        ) }
        <Player />
      </div>
    );
  }
}

Dungeon.propTypes = {
  dungeon: PropTypes.bool,
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
