import React from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_APP_RESET } from '../constants/appConstants';
import { closeNoteEditors } from '../actions/noteActions';
import '../styles/modalNav.css';

const DetailModalNav = ({ app, color, toDetails, toNotes, tab }) => {
  const dispatch = useDispatch();

  return (
    <div className='modal-nav-container'>
      <div
        onClick={(e) => {
          e.stopPropagation();
          dispatch(closeNoteEditors(app));
          toDetails();
        }}
        className={`modal-nav-link ${
          tab === 'details' ? 'modal-nav-link-active' : ''
        } ${color ? color : 'default'} ${
          color ? color : 'default'
        }-accent-border`}
      >
        Details
      </div>
      <div
        className={`modal-nav-link ${
          tab === 'notes' ? 'modal-nav-link-active' : ''
        } ${color ? color : 'default'} ${
          color ? color : 'default'
        }-accent-border`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: UPDATE_APP_RESET });
          toNotes();
        }}
      >
        Notes
      </div>
    </div>
  );
};

export default DetailModalNav;
