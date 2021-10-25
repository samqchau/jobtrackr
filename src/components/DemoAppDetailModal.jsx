import React, { useState, useRef } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import Message from './Message';
import ColorSelect from './ColorSelect';
import FavoriteButton from './FavoriteButton';

const DemoAppDetailModal = ({ show, handleClose, app, setApps }) => {
  const [company, setCompany] = useState(
    app.companyName ? app.companyName : ''
  );
  const [jobTitle, setJobTitle] = useState(app.jobTitle ? app.jobTitle : '');
  const [description, setDescription] = useState(
    app.description ? app.description : ''
  );
  const [deadline, setDeadline] = useState(app.deadline ? app.deadline : '');
  const [applicationDate, setApplicationDate] = useState(
    app.application ? app.application : ''
  );
  const [interviewDate, setInterviewDate] = useState(
    app.interview ? app.interview : ''
  );
  const [offerDate, setOfferDate] = useState(app.offer ? app.offer : '');
  const [offerAcceptanceDate, setOfferAcceptanceDate] = useState(
    app.acceptance ? app.acceptance : ''
  );
  const [url, setUrl] = useState(app.url ? app.url : '');
  const [salary, setSalary] = useState(app.salary ? app.salary : '');
  const [color, setColor] = useState(app.color ? app.color : 'default');
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [location, setLocation] = useState(app.location ? app.location : '');
  const [validationMessages, setValidationMessages] = useState([]);

  const modalRef = useRef();

  const openColorSelect = () => {
    setShowColorSelect(true);
  };

  const closeColorSelect = () => {
    setShowColorSelect(false);
  };

  const handleUpdateButtonClick = () => {
    setValidationMessages(['Login to start saving data']);
  };

  const handleCloseButtonClick = () => {
    setValidationMessages([]);
    handleClose();
  };

  const changeColorTo = (color) => {
    setColor(color);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setValidationMessages([]);
        closeColorSelect();
        handleClose();
      }}
      centered
      size='xl'
      className='detailModal'
    >
      <Modal.Header
        ref={modalRef}
        className={`detailModal-header ${color ? color : 'default'} ${
          color ? color : 'default'
        }-modal-header-border`}
        onClick={(e) => {
          closeColorSelect();
        }}
      >
        <Row className='detailModal-header-nav'>
          <div className='detailModal-header-nav-buttonContainer'>
            <Button
              className={`${color}-accent-border modal-button detail-modal-updateButton`}
              onClick={handleUpdateButtonClick}
            >
              Update
            </Button>
            <Button
              className={`${color}-accent-border modal-button detail-modal-closeButton`}
              onClick={handleCloseButtonClick}
            >
              Close
            </Button>
          </div>
          <div className='detailModal-header-main'>
            <div className='detailModal-header-main-text'>
              <p className={`detailModal-header-main-text-company`}>
                {app.companyName}
              </p>
              <p className={`detailModal-header-main-text-job`}>
                {app.jobTitle}
              </p>
            </div>
            <FavoriteButton
              app={app}
              color={color}
              demoButton
              setApps={setApps}
            />
          </div>
        </Row>
      </Modal.Header>
      <Modal.Body
        className={`detailModal-body ${
          color ? color : 'default'
        }-body  ${color}-modal-body-border`}
        as={Row}
        onClick={() => {
          closeColorSelect();
        }}
      >
        <div className='detailModal-message-container demoModal-message-container'>
          {validationMessages.length > 0 && (
            <Message variant='danger'>
              <ul
                className='validation-list'
                style={{ marginBottom: '0px', listStyle: 'none' }}
              >
                {validationMessages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </Message>
          )}
        </div>

        <Col
          xs={12}
          sm={12}
          md={8}
          className='detailModal-body-left'
          as={Row}
          autoComplete='off'
        >
          <Form.Group as={Col} xs={12} sm={6} md={6} lg={6}>
            <Form.Label>Company</Form.Label>
            <Form.Control
              autoComplete='off'
              className='capitalize'
              autoComplete='off'
              value={company}
              placeholder='+ Company Name'
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={6} lg={6}>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              autoComplete='off'
              className='capitalize'
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              placeholder='+ Job Title'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={8}>
            <Form.Label>URL</Form.Label>
            <Form.Control
              autoComplete='off'
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              placeholder='+ Enter URL'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={4}>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              autoComplete='off'
              value={salary ? salary : ''}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              placeholder='+ Salary'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={8}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              autoComplete='off'
              className='capitalize'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder='+ Location'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={4}>
            <Form.Label>Color</Form.Label>
            <ColorSelect
              color={color}
              setColor={changeColorTo}
              show={showColorSelect}
              openColorSelect={openColorSelect}
              closeColorSelect={closeColorSelect}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              autoComplete='off'
              as='textarea'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder='+ Description...'
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={4} className='detailModal-body-right'>
          <Row className='detailModal-body-right-content'>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>
                  Application Deadline
                </span>
                <span
                  className={`clear-border detailModal-date-clear ${
                    color ? color : 'default'
                  }-clear-border`}
                  onClick={(e) => {
                    setDeadline('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Applied on</span>
                <span
                  className={`clear-border detailModal-date-clear ${
                    color ? color : 'default'
                  }-clear-border`}
                  onClick={(e) => {
                    setApplicationDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={applicationDate}
                onChange={(e) => {
                  setApplicationDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Interview Date</span>
                <span
                  className={`clear-border detailModal-date-clear ${
                    color ? color : 'default'
                  }-clear-border`}
                  onClick={(e) => {
                    setInterviewDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={interviewDate}
                onChange={(e) => {
                  setInterviewDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Offer Recieved</span>
                <span
                  className={`clear-border detailModal-date-clear ${
                    color ? color : 'default'
                  }-clear-border`}
                  onClick={(e) => {
                    setOfferDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={offerDate}
                onChange={(e) => {
                  setOfferDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Accept Offer by</span>
                <span
                  className={`clear-border detailModal-date-clear ${
                    color ? color : 'default'
                  }-clear-border`}
                  onClick={(e) => {
                    setOfferAcceptanceDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={offerAcceptanceDate}
                onChange={(e) => {
                  setOfferAcceptanceDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Col>
        <Button
          className='detail-modal-updateButton detailModal-updateButton-xs'
          onClick={() => {
            modalRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            handleUpdateButtonClick();
          }}
        >
          Update
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DemoAppDetailModal;
