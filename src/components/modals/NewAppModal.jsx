import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/newAppModal.css';
import { addAppToList } from '../../actions/appActions';
import ColorSelect from '../ColorSelect';
import Message from '../Message';
import { APP_TOOL_TIP_ON, POST_APP_RESET } from '../../constants/appConstants';
import { noApps } from '../../helpers/NoApps';

const listValues = [
  'Wishlist',
  'Applied',
  'Phone',
  'On Site',
  'Offer',
  'Rejected',
];

const NewAppModal = ({ show, handleClose, listValue }) => {
  const dispatch = useDispatch();
  const postApp = useSelector((state) => state.postApp);
  const { success, error } = postApp;
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  let today = new Date(Date());
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [list, setList] = useState(listValue);
  const [date, setDate] = useState(`${yyyy}-${mm}-${dd}`);
  const [url, setUrl] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('default');
  const [description, setDescription] = useState('');
  const [validationMessages, setValidationMessages] = useState([]);

  const [showColorSelect, setShowColorSelect] = useState(false);

  const resetForm = useCallback(() => {
    setCompanyName('');
    setJobTitle('');
    setList(listValue);
    setDate(`${yyyy}-${mm}-${dd}`);
    setUrl('');
    setSalary('');
    setColor('default');
    setDescription('');
    dispatch({ type: POST_APP_RESET });
    setValidationMessages([]);
  }, [dd, dispatch, listValue, mm, yyyy]);

  useEffect(() => {
    if (success) {
      handleClose();
      setTimeout(resetForm, 1000);
    }
  }, [success, handleClose, resetForm]);

  const validateForm = () => {
    let arr = [];
    if (companyName.length < 1) {
      arr.push('Company name is a required field');
    }
    if (jobTitle.length < 1) {
      arr.push('Job title is a required field');
    }
    if (arr.length < 1) {
      setValidationMessages([]);
      return true;
    } else {
      setValidationMessages(arr);
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setValidationMessages([]);
    if (validateForm()) {
      let application = {
        companyName,
        jobTitle,
        list,
        date,
        url,
        salary,
        location,
        color,
        description,
        notes: [],
      };
      dispatch(addAppToList(application));
    }
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

  const onHide = () => {
    handleClose();
    resetForm();
    closeColorSelect();
    if (noApps(apps)) {
      dispatch({ type: APP_TOOL_TIP_ON });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size='md'
      className='newAppModal'
      contentClassName='newAppCustomModal'
      onClick={() => {
        if (showColorSelect) {
          closeColorSelect();
        }
      }}
    >
      <Modal.Header>
        <Modal.Title>Track a new application</Modal.Title>
        <div className='newAppModal-button-container'>
          <Button
            onClick={submitHandler}
            variant='success'
            className='modal-button'
          >
            Save
          </Button>
          <Button variant='dark' onClick={onHide} className='modal-button'>
            Close
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
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
            Your application has been saved successfully
          </Message>
        )}
        {error && <Message variant='danger'>{error}</Message>}
        <Form as={Row} autoComplete='off'>
          <Form.Group as={Col} controlId='companyName' xs={12} sm={6}>
            <Form.Label>Company Name *</Form.Label>
            <Form.Control
              autoComplete='off'
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='jobTitle' as={Col} xs={12} sm={6}>
            <Form.Label>Job Title *</Form.Label>
            <Form.Control
              autoComplete='off'
              placeholder='Enter Job Title'
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='list' as={Col} xs={12} sm={6}>
            <Form.Label>List</Form.Label>
            <Form.Control
              as='select'
              value={list}
              onChange={(e) => {
                setList(e.target.value);
              }}
            >
              {listValues.map((item, i) => (
                <option value={i + 1} key={i + 1}>
                  {listValues[i]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='dateApplied' as={Col} xs={12} sm={6}>
            <Form.Label>Date Applied</Form.Label>
            <Form.Control
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='url' as={Col} xs={12} sm={6}>
            <Form.Label>URL</Form.Label>
            <Form.Control
              autoComplete='off'
              placeholder='+  Add URL'
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='salary' as={Col} xs={12} sm={6}>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              autoComplete='off'
              placeholder='Salary'
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='location' as={Col} xs={12} sm={6}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              autoComplete='off'
              placeholder='Location'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='color' as={Col} xs={12} sm={6}>
            <Form.Label>Color</Form.Label>
            <ColorSelect
              color={color}
              setColor={changeColorTo}
              show={showColorSelect}
              openColorSelect={openColorSelect}
              closeColorSelect={closeColorSelect}
            />
          </Form.Group>

          <Form.Group controlId='description' as={Col} xs={12}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              autoComplete='off'
              placeholder='Job Description'
              value={description}
              as='textarea'
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewAppModal;
