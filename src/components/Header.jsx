import React from 'react';
import { Container } from 'react-bootstrap';
import OpenFavorites from './OpenFavorites';
import '../styles/header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <Container fluid className='header-background'>
      <Container className='header-container' fluid>
        <a
          className='header-left'
          href='https://samqchau.github.io/portfolio-v1.0.0/'
          target='_blank'
          rel='noreferrer'
          title="Sam Chau's portfolio"
        >
          <Logo />
          <span className='header-logo-text'>JobTrackr</span>
        </a>
        <div className='header-center'></div>
        <div className='header-right'>
          <OpenFavorites />
        </div>
      </Container>
    </Container>
  );
};

export default Header;
