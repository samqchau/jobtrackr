import { Modal } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import NotesModal from '../NotesModal';
import DetailModal from '../DetailModal';
import '../../styles/appDetailsModal.css';

const AppDetailsModal = ({ app, show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='xl'
      className='detailModal'
    >
      <Route
        path={`/app_details/${app.id}`}
        render={(props) => (
          <DetailModal {...props} app={app} handleClose={handleClose} />
        )}
      />
      <Route
        path={`/app_notes/${app.id}`}
        render={(props) => (
          <NotesModal {...props} app={app} handleClose={handleClose} />
        )}
      />
    </Modal>
  );
};

export default AppDetailsModal;
