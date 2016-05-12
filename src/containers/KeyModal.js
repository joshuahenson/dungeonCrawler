import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleKeyModal } from '../actions/index';
import { bindActionCreators } from 'redux';
import Modal from '../components/Modal';

const enemyColors = ['green', 'blue', 'purple', 'red'];

class KeyModal extends Component {
  render() {
    return (
      <Modal
        showing={this.props.keyModal}
        hide={ () => this.props.toggleKeyModal() }
      >
        <h2>Key</h2>
        <hr />
        <div>
          <span>You: </span>
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill="yellow" />
            <rect x="2" y="3" width="2" height="1" />
            <rect x="6" y="3" width="2" height="1" />
            <rect x="3" y="6" width="4" height="2" />
          </svg>
        </div>
        <div>
          <span>Stairs leading up: </span>
          <svg width="10" height="10">
            <rect x="0" y="0" width="10" height="10" fill="rgb(20,20,20)" />
            <path d="M1 9 L5 9 L5 5 L9 5 L9 1" stroke="white" fill="none" />
          </svg>
        </div>
        <div>
          <span>Stairs leading down: </span>
          <svg width="10" height="10">
            <rect x="0" y="0" width="10" height="10" fill="rgb(20,20,20)" />
            <path d="M1 1 L1 5 L5 5 L5 9 L9 9" stroke="red" fill="none" />
          </svg>
        </div>
        <div>
        <div>
          <span>Enemies: </span>
          { enemyColors.map((color, index) =>
            <svg width="15" height="10" key={index}>
              <circle cx="5" cy="5" r="5" fill={color} />
              <rect x="2" y="3" width="2" height="1" />
              <rect x="6" y="3" width="2" height="1" />
              <rect x="3" y="6" width="4" height="2" />
            </svg>
          ) }
        </div>
          <span>Health Pack: </span>
          <svg width="10" height="10">
            <rect x="0" y="0" width="10" height="10" fill="white" />
            <rect x="2" y="4" width="6" height="2" fill="red" />
            <rect x="4" y="2" width="2" height="6" fill="red" />
          </svg>
        </div>
        <div>
          <span>Weapon: </span>
          <svg width="10" height="10">
            <rect x="0" y="0" width="10" height="10" fill="rgb(240,240,240)" />
            <rect x="4" y="1" width="2" height="8" fill="rgb(20,20,20)" />
            <rect x="3" y="6" width="4" height="1" fill="rgb(20,20,20)" />
          </svg>
        </div>
        <hr />
        <button onClick={ () => this.props.toggleKeyModal() }>Close</button>
      </Modal>
    );
  }
}

KeyModal.propTypes = {
  keyModal: PropTypes.bool,
  toggleKeyModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    keyModal: state.modal.keyModal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleKeyModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyModal);
