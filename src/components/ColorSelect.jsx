import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/colorSelect.css';
import { colorsArr } from '../styles/colorPallet';

const ColorSelect = ({
  color,
  setColor,
  show,
  openColorSelect,
  closeColorSelect,
}) => {
  return (
    <>
      <div
        className='colorSelect'
        onClick={(e) => {
          e.stopPropagation();
          openColorSelect();
        }}
      >
        <div className={`colorSelect-content ${color}`}></div>
      </div>
      {show && (
        <Row
          className='colorSelect-menu'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {colorsArr.map((clr, i) => (
            <Col
              xs={1}
              sm={2}
              md={4}
              key={i}
              className={`colorSelect-menu-option-container`}
            >
              <div
                className={`colorSelect-menu-option-border ${
                  clr === color && 'colorSelect-menu-option-active'
                }`}
                onClick={(e) => {
                  setColor(clr);
                  closeColorSelect();
                }}
              >
                <div className={`colorSelect-menu-option  ${clr} `}></div>
              </div>
            </Col>
          ))}
        </Row>
      )}{' '}
    </>
  );
};

export default ColorSelect;
