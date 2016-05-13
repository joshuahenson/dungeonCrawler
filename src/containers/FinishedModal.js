import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleFinishedModal, restartGame } from '../actions/index';
import { bindActionCreators } from 'redux';
import Modal from '../components/Modal';

class FinishedModal extends Component {
  render() {
    return (
      <Modal
        showing={this.props.finished.modal}
        hide={ () => this.props.toggleFinishedModal() }
      >
        <div>
          <h2>{this.props.finished.title}</h2>
          <hr />
            {this.props.finished.message}
            <button onClick={ () => this.props.restartGame() }>Play again</button>
          <hr />
        </div>
        <button onClick={ () => this.props.toggleFinishedModal() }>Close</button>
      </Modal>
    );
  }
}

FinishedModal.propTypes = {
  finished: PropTypes.object,
  toggleFinishedModal: PropTypes.func,
  restartGame: PropTypes.func
};

function mapStateToProps(state) {
  return {
    finished: state.modal.finishedModal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleFinishedModal, restartGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishedModal);
