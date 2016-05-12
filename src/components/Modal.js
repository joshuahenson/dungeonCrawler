import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-overlays';

export default class StyledModal extends Component {
  render() {
    return (
      <Modal
        aria-labelledby="modal-label"
        className="modal"
        backdropClassName="modal-backdrop"
        show={this.props.showing}
        onHide={this.props.hide}
        container={document.getElementById('root')}
      >
        <div className="modal-dialog" >
          {this.props.children}
        </div>
      </Modal>
    );
  }
}

StyledModal.propTypes = {
  showing: PropTypes.bool,
  hide: PropTypes.func,
  children: PropTypes.node
};
