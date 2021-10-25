import React, { useState, useRef } from 'react';
import { Modal, Row, Button, Form } from 'react-bootstrap';
import ListSelect from './ListSelect';
import FavoriteButton from './FavoriteButton';
import '../styles/notesModal.css';
import DetailModalNav from './DetailModalNav';
import { useDispatch } from 'react-redux';
import AppNote from './AppNote';
import { saveNote, closeNoteEditors } from '../actions/noteActions';
import Message from './Message';

const NotesModal = ({ app, handleClose, tab, toDetails, toNotes }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('Save a new note');
  const [creatingNote, setCreatingNote] = useState(app.notes.length === 0);
  const [showListSelect, setShowListSelect] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const notesModalBodyRef = useRef();

  const openListSelect = () => {
    setShowListSelect(true);
  };

  const closeListSelect = () => {
    setShowListSelect(false);
  };

  const closeCreatingNote = () => {
    setCreatingNote(false);
  };

  const handleCloseButtonClick = () => {
    setNoteContent('');
    handleClose();
  };

  const clearNoteContent = () => {
    setNoteContent('');
  };

  const handleSaveClick = () => {
    if (noteContent.trim()) {
      dispatch(saveNote(app, noteContent));
      setCreatingNote(false);
      setNoteContent('');
    } else {
      setErrorMessage('Empty notes cannot be saved');
    }
  };

  return (
    <>
      <Modal.Header
        className={`detailModal-header ${app.color ? app.color : 'default'} ${
          app.color ? app.color : 'default'
        }-modal-header-border`}
        onClick={(e) => {
          e.stopPropagation();
          closeListSelect();
          setErrorMessage('');
        }}
      >
        <Row className='detailModal-header-nav'>
          <div className='detailModal-header-nav-buttonContainer'>
            <div className='detailModal-moveButton-container'>
              <Button
                className={`modal-button detail-modal-moveButton ${app.color}-accent-border`}
                onClick={(e) => {
                  e.stopPropagation();
                  openListSelect();
                }}
              >
                Move
              </Button>
              {showListSelect && (
                <ListSelect close={closeListSelect} app={app} />
              )}
            </div>
            <Button
              className={`modal-button ${app.color}-accent-border detail-modal-closeButton`}
              onClick={(e) => {
                e.stopPropagation();
                setNoteContent('');
                handleCloseButtonClick();
              }}
            >
              Close
            </Button>
          </div>
          <div className='detailModal-header-main'>
            <div className='detailModal-header-main-text'>
              <p className='detailModal-header-main-text-company'>
                {app.companyName}
              </p>
              <p className='detailModal-header-main-text-job'>{app.jobTitle}</p>
            </div>
            <FavoriteButton app={app} color={app.color} />
          </div>
          <DetailModalNav
            app={app}
            color={app.color}
            toDetails={toDetails}
            toNotes={toNotes}
            tab={tab}
          />
        </Row>
      </Modal.Header>
      <Modal.Body
        className={`notesModal-body detailModal-body ${
          app.color ? app.color : 'default'
        }-body ${app.color}-modal-body-border`}
        ref={notesModalBodyRef}
        onClick={() => {
          closeListSelect();
          setErrorMessage('');
        }}
      >
        <div className='notesModal-body-container'>
          {(app.notes.length === 0 || creatingNote) && (
            <>
              <div
                className='notesModal-body-button-container'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Message
                  style={{
                    margin: '0px',
                    padding: '0px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '3px',
                    paddingLeft: '23px',
                    borderRadius: '10px 10px 0 0',
                    borderBottom: 'unset !important',
                  }}
                  className={`${app.color ? app.color : 'default'} ${
                    app.color ? app.color : 'default'
                  }-accent-border`}
                >
                  {errorMessage}
                </Message>
                <div
                  className='notesModal-body-create-container'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveClick();
                  }}
                >
                  <div
                    className={`notesModal-body-create-right ${
                      app.color ? app.color : 'default'
                    } ${app.color ? app.color : 'default'}-accent-border`}
                    title='Save'
                  >
                    <i className='fas fa-plus notesModal-body-create-icon'></i>
                    <span className='notesModal-body-create-text'>Save</span>
                  </div>
                </div>
                <div
                  className='notesModal-body-create-container'
                  onClick={(e) => {
                    e.stopPropagation();
                    if (app.notes) {
                      if (app.notes.length !== 0) {
                        setCreatingNote(false);
                      } else {
                        setErrorMessage('Create your first note to display');
                      }
                    }
                  }}
                >
                  <div
                    className={`notesModal-body-create-right ${
                      app.color ? app.color : 'default'
                    } ${app.color ? app.color : 'default'}-accent-border`}
                    title='Close'
                  >
                    <i className='fas fa-times notesModal-body-close-icon'></i>
                    <span className='notesModal-body-create-text'>Close</span>
                  </div>
                </div>
              </div>
              <Form
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Form.Group>
                  <Form.Control
                    as='textarea'
                    placeholder='Save your notes here'
                    value={noteContent}
                    onChange={(e) => {
                      setNoteContent(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </>
          )}
          {app.notes.length > 0 &&
            app.notes.map((note, i) => (
              <AppNote
                note={note}
                key={i}
                app={app}
                clearNoteContent={clearNoteContent}
                closeCreatingNote={closeCreatingNote}
              />
            ))}
        </div>
      </Modal.Body>
      {!creatingNote && app.notes.length !== 0 && (
        <div className='notesModal-open-form-button'>
          <div
            className={`notesModal-body-create-right square-corner  ${app.color}`}
            title='Create a note'
            onClick={(e) => {
              e.stopPropagation();
              dispatch(closeNoteEditors(app));
              setCreatingNote(true);
              notesModalBodyRef.current.scroll({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <i className='fas fa-plus notesModal-body-create-icon'></i>
            <span className='notesModal-body-create-text'>Note</span>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesModal;
