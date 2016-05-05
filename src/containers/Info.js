import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Info extends Component {
  render() {
    return (
      <div className="info">
        test
      </div>
    );
  }
}

Info.propTypes = {
  player: PropTypes.object
};

function mapStateToProps(state) {
  return {
    player: state.player
  };
}

export default connect(mapStateToProps)(Info);
