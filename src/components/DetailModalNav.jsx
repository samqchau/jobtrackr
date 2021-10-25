import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UPDATE_APP_RESET } from '../constants/appConstants';
import '../styles/modalNav.css';

const DetailModalNav = ({ app, color }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const routeName = path.split('/')[1];

  return (
    <div className='modal-nav-container'>
      <Link
        to={`/app_details/${app.id}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`modal-nav-link ${
          routeName === 'app_details' ? 'modal-nav-link-active' : ''
        } ${color ? color : 'default'} ${
          color ? color : 'default'
        }-accent-border`}
      >
        Details
      </Link>
      <Link
        to={`/app_notes/${app.id}${app.notes.length === 0 ? '/create' : ''}`}
        className={`modal-nav-link ${
          routeName === 'app_notes' ? 'modal-nav-link-active' : ''
        } ${color ? color : 'default'} ${
          color ? color : 'default'
        }-accent-border`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: UPDATE_APP_RESET });
        }}
      >
        Notes
      </Link>
    </div>
  );
};

export default DetailModalNav;
