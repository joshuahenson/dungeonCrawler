import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
// import { sampleAction } from '../actions/index';
// import { bindActionCreators } from 'redux';

export default class Dungeon extends Component {
  render() {
    return (
      <div className="dungeon">
        <div className="room" style={{
          top: this.props.dimensions.top,
          left: this.props.dimensions.left,
          width: this.props.dimensions.width,
          height: this.props.dimensions.height
        }}
        />
        <Player />
      </div>
    );
  }
}

Dungeon.propTypes = {
  dungeon: PropTypes.bool,
  dimensions: PropTypes.object,
  SampleAction: PropTypes.func
};

function mapStateToProps(state) {
  return {
    dimensions: state.dungeon.dimensions
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ sampleAction }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dungeon);
export default connect(mapStateToProps)(Dungeon);
