import React from 'react';
import '../styles/teamCard.css';

const TeamCard = () => {
  return (
    <div className='team-card landing-section-content'>
      <div className='team-card-left'>
        <img
          src='pngs/jobtracker-profile-1.jpg'
          alt='Samuel Chau'
          className='team-card-left-picture'
        />
      </div>
      <div className='team-card-right'>
        <a
          href='https://samqchau.github.io/portfolio/'
          target='_blank'
          rel='noreferrer'
          className='portfolio-container'
        >
          <div className='portfolio-link'>Visit My Portfolio </div>
          <div className='external-link'></div>
        </a>
        <div className='team-card-socials-container'>
          <div className='footer-content-right'>
            <i
              title='Instagram'
              className='footer-social-icon fab fa-instagram fa-lg'
            ></i>
            <i
              className='footer-social-icon fab fa-facebook-square fa-lg'
              title='Facebook'
            ></i>
            <i
              className='footer-social-icon fab fa-twitter fa-lg'
              title='Twitter'
            ></i>
          </div>
        </div>
        <p>Let's work together</p>
      </div>
    </div>
  );
};

export default TeamCard;
