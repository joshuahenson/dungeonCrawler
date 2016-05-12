import React, { PropTypes } from 'react';
import { Modal } from 'react-overlays';

const StyledModal = ({ showing, hide, children }) => (
  <Modal
    aria-labelledby="modal-label"
    className="modal"
    backdropClassName="modal-backdrop"
    show={showing}
    onHide={hide}
    container={document.getElementById('root')}
  >
    <div className="modal-dialog" >
      {children}
    </div>
  </Modal>
);

StyledModal.propTypes = {
  showing: PropTypes.bool,
  hide: PropTypes.func,
  children: PropTypes.node
};

export default StyledModal;
