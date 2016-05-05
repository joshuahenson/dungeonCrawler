import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Message extends Component {
  render() {
    return (
      <div className="info">
        test
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.array
};

function mapStateToProps(state) {
  return {
    message: state.message
  };
}

export default connect(mapStateToProps)(Message);
