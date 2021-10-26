import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return userInfo ? (
    <div className='header-icon' onClick={logoutHandler} title='Logout'>
      <i className='fas fa-sign-out-alt'></i>
    </div>
  ) : null;
};

export default LogoutButton;
