import React from 'react';
import { Container } from 'react-bootstrap';
import OpenFavorites from './OpenFavorites';
import '../styles/header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <Container fluid className='header-background'>
      <Container className='header-container' fluid>
        <div className='header-left'>
          <Logo />
          <span className='header-logo-text'>JobTrackr</span>
        </div>
        <div className='header-center'></div>
        <div className='header-right'>
          <OpenFavorites />
        </div>
      </Container>
    </Container>
  );
};

export default Header;
