import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-overlays';

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  position: 'fixed',
  top: 0, bottom: 0, left: 0, right: 0,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = {
  position: 'absolute',
  width: 400,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '1px solid #e5e5e5',
  backgroundColor: 'white',
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
  padding: 20
};

class KeyModal extends Component {
  render() {
    return (
      <Modal
        aria-labelledby="modal-label"
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={this.props.modal}
        onHide={() => this.props.toggleModal()}
      >
          <div style={dialogStyle} >
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
