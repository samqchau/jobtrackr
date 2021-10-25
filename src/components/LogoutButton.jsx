import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    history.push('/info');
    dispatch(logoutUser());
  };
  return userInfo ? (
    <div className='header-icon' onClick={logoutHandler} title='Logout'>
      <i className='fas fa-sign-out-alt'></i>
    </div>
  ) : null;
};

export default LogoutButton;
