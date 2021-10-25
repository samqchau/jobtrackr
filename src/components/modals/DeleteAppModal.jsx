import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/deleteModal.css';

const DeleteAppModal = ({ show, handleClose, deleteHandler, item }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='md'
      className='deleteModal'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal.Body className='deleteModal-body'>
        <h4>Delete {`${item}`}</h4>
        <p>{`Are you sure you want to delete this ${item}?`}</p>
        <div className='deleteModal-body-button-container'>
          <Button
            className='modal-button deleteModal-delete-button default-accent-border'
            onClick={(e) => {
              e.stopPropagation();
              deleteHandler();
            }}
          >
            Delete
          </Button>
          <Button
            className='modal-button deleteModal-cancel-button default-accent-border'
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAppModal;
