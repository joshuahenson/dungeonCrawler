import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export default class Message extends Component {
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.message);
    node.scrollTop = node.scrollHeight;
  }
  render() {
    return (
      <div ref="message" className="message">
        { this.props.messages.map((message, index) => <p key={ index }>{ message }</p>) }
      </div>
    );
  }
}

Message.propTypes = {
  messages: PropTypes.array
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(Message);
