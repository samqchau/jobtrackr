import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { trimDate } from '../helpers/dateHelpers';
import { UPDATE_APP_RESET } from '../constants/appConstants';
import { updateAppById } from '../actions/appActions';
import ListSelect from './ListSelect';
import FavoriteButton from './FavoriteButton';
import Message from './Message';
import ColorSelect from './ColorSelect';
import DetailModalNav from './DetailModalNav';

const DetailModal = ({ app, handleClose, tab, toDetails, toNotes }) => {
  const dispatch = useDispatch();

  const updateApp = useSelector((state) => state.updateApp);
  const { success, error } = updateApp;

  const [company, setCompany] = useState(app.companyName);
  const [jobTitle, setJobTitle] = useState(app.jobTitle);
  const [url, setUrl] = useState(app.url);
  const [color, setColor] = useState(app.color);
  const [salary, setSalary] = useState(app.salary);
  const [location, setLocation] = useState(app.location);
  const [description, setDescription] = useState(app.description);
  const [validationMessages, setValidationMessages] = useState([]);
  const [showListSelect, setShowListSelect] = useState(false);

  const [deadline, setDeadline] = useState(
    app.deadline ? trimDate(app.deadline) : ''
  );
  const [applicationDate, setApplicationDate] = useState(
    app.application ? trimDate(app.application) : ''
  );
  const [interviewDate, setInterviewDate] = useState(
    app.interview ? trimDate(app.interview) : ''
  );
  const [offerDate, setOfferDate] = useState(
    app.offer ? trimDate(app.offer) : ''
  );
  const [offerAcceptanceDate, setOfferAcceptanceDate] = useState(
    app.offer_acceptance ? trimDate(app.offer_acceptance) : ''
  );

  const [showColorSelect, setShowColorSelect] = useState(false);

  const modalRef = useRef();

  const validateForm = () => {
    let arr = [];
    if (company.length < 1) {
      arr.push('Company name is a required field');
    }
    if (jobTitle.length < 1) {
      arr.push('Job title is a required field');
    }
    if (arr.length < 1) {
      return true;
    } else {
      setValidationMessages(arr);
      return false;
    }
  };

  const handleUpdateButtonClick = (e) => {
    dispatch({ type: UPDATE_APP_RESET });

    if (validateForm()) {
      let updatedApp = app;
      updatedApp.companyName = company;
      updatedApp.jobTitle = jobTitle;
      updatedApp.url = url;
      updatedApp.color = color;
      updatedApp.salary = salary;
      updatedApp.location = location;
      updatedApp.description = description;
      updatedApp.deadline = deadline;
      updatedApp.application = applicationDate;
      updatedApp.offer = offerDate;
      updatedApp.offer_acceptance = offerAcceptanceDate;
      updatedApp.interview = interviewDate;

      dispatch(updateAppById(updatedApp));
    }
  };

  const openListSelect = (e) => {
    e.stopPropagation();
    setShowListSelect(true);
  };

  const closeListSelect = () => {
    setShowListSelect(false);
  };

  const handleCloseButtonClick = (e) => {
    handleClose();
  };

  const changeColorTo = (color) => {
    setColor(color);
  };

  const openColorSelect = () => {
    setShowColorSelect(true);
  };

  const closeColorSelect = () => {
    setShowColorSelect(false);
  };

  return (
    <>
      <Modal.Header
        className={`detailModal-header ${color ? color : 'default'} ${
          color ? color : 'default'
        }-modal-header-border`}
        onClick={(e) => {
          closeListSelect();
          closeColorSelect();
        }}
        ref={modalRef}
      >
        <Row className='detailModal-header-nav'>
          <div className='detailModal-header-nav-buttonContainer'>
            <div className='detailModal-moveButton-container'>
              <Button
                className={`modal-button detail-modal-moveButton ${color}-accent-border`}
                onClick={openListSelect}
              >
                Move
              </Button>
              {showListSelect && (
                <ListSelect close={closeListSelect} app={app} />
              )}
            </div>
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
            <FavoriteButton app={app} color={color} />
          </div>
          <DetailModalNav
            app={app}
            color={color}
            tab={tab}
            toDetails={toDetails}
            toNotes={toNotes}
          />
        </Row>
      </Modal.Header>
      <Modal.Body
        className={`detailModal-body ${
          color ? color : 'default'
        }-body  ${color}-modal-body-border`}
        as={Row}
        onClick={() => {
          closeListSelect();
          closeColorSelect();
        }}
      >
        <div className='detailModal-message-container'>
          {validationMessages.length > 0 && (
            <Message variant='danger'>
              <ul className='validation-list'>
                {validationMessages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </Message>
          )}
          {success && (
            <Message variant='success'>
              Your application has been updated successfully
            </Message>
          )}
          {error && <Message variant='danger'>{error}</Message>}
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
                  className={`clear-border detailModal-date-clear ${color}-clear-border`}
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
                  className={`clear-border detailModal-date-clear ${color}-clear-border`}
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
                  className={`clear-border detailModal-date-clear ${color}-clear-border`}
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
                  className={`clear-border detailModal-date-clear ${color}-clear-border`}
                  onClick={(e) => {
                    setOfferDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                autoComplete='off'
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
                  className={`clear-border detailModal-date-clear ${color}-clear-border`}
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
            handleUpdateButtonClick();
            modalRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
        >
          Update
        </Button>
      </Modal.Body>
    </>
  );
};

export default DetailModal;
