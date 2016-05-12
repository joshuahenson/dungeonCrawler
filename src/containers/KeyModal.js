import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-overlays';

class KeyModal extends Component {
  render() {
    return (
      <Modal
        aria-labelledby="modal-label"
        className="modal"
        backdropClassName="modal-backdrop"
        show={this.props.modal}
        onHide={() => this.props.toggleModal()}
      >
        <div className="modal-dialog" >
          <h4 id="modal-label">Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </div>
      </Modal>
    );
  }
}

KeyModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    modal: state.modal
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyModal);
