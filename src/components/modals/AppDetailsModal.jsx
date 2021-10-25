import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import NotesModal from '../NotesModal';
import DetailModal from '../DetailModal';
import '../../styles/appDetailsModal.css';
import { closeNoteEditors } from '../../actions/noteActions';

const AppDetailsModal = ({ app, show, handleClose }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('details');

  const toNotes = () => {
    setTab('notes');
  };
  const toDetails = () => {
    setTab('details');
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        dispatch(closeNoteEditors(app));
        setTimeout(() => {
          toDetails();
        }, 500);
      }}
      centered
      size='xl'
      className='detailModal'
    >
      {tab === 'details' && (
        <DetailModal
          app={app}
          handleClose={handleClose}
          tab={tab}
          toDetails={toDetails}
          toNotes={toNotes}
        />
      )}
      {tab === 'notes' && (
        <NotesModal
          app={app}
          handleClose={handleClose}
          tab={tab}
          toDetails={toDetails}
          toNotes={toNotes}
        />
      )}
    </Modal>
  );
};

export default AppDetailsModal;
