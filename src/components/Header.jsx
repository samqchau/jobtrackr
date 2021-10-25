import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import OpenFavorites from './OpenFavorites';
import '../styles/header.css';
import Logo from './Logo';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Container fluid className='header-background'>
      <Container className='header-container' fluid>
        <div className='header-left'>
          <Logo />
          <span className='header-logo-text'>JobTrackr</span>
        </div>
        <div className='header-center'></div>
        <div className='header-right'>
          {userInfo && <OpenFavorites />}
          <LogoutButton />
        </div>
      </Container>
    </Container>
  );
};

export default Header;
