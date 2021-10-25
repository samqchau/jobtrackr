import React, { useState, useEffect } from 'react';
import {
  Form,
  Col,
  Modal,
  Button,
  Row,
  Container,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userActions';
import Message from '../Message';
import { validate, res } from 'react-email-validator';
import '../../styles/registerModal.css';
import { USER_REGISTER_RESET } from '../../constants/userConstants';

const RegisterModal = ({ show, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessages, setValidationMessages] = useState([]);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error: responseError, success } = userRegister;

  const formValidated = () => {
    let errArr = [];
    if (firstName.length < 1 || familyName.length < 1) {
      errArr.push('First and last names are required');
    }
    if (email.length < 1) {
      errArr.push('Email is required');
    } else {
      validate(email);
      if (!res) {
        errArr.push('This email is invalid');
      }
    }
    if (username.length < 1) {
      errArr.push('Username is required');
    }
    if (password.length < 8) {
      errArr.push('Password must be 8 characters long');
    }
    if (password !== confirmPassword) {
      errArr.push('Passwords do not match');
    }

    if (errArr.length === 0) {
      return true;
    } else {
      setValidationMessages(errArr);
      return false;
    }
  };

  const resetRegisterForm = () => {
    setFirstName('');
    setFamilyName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setValidationMessages('');
    dispatch({ type: USER_REGISTER_RESET });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setValidationMessages([]);
    if (formValidated()) {
      let user = {
        firstName,
        familyName,
        email,
        username,
        password,
      };
      dispatch(registerUser(user));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      resetRegisterForm();
      handleClose();
    }, 1500);
  }, [success]);

  return (
    <Modal show={show} onHide={handleClose} centered size='md'>
      <Modal.Header>
        <Modal.Title>Register to track your job applications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError && <Message variant='danger'>{responseError}</Message>}
        {success && (
          <Message variant='success'>You have successfully registered!</Message>
        )}
        {validationMessages.length > 0 && (
          <Message variant='danger'>
            {
              <ul className='validation-list'>
                {validationMessages.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            }
          </Message>
        )}
        <Form as={Row}>
          <Form.Group
            className='pb-2'
            as={Col}
            controlId='firstName'
            xs={12}
            sm={6}
          >
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              required
              placeholder='First Name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='familyName'
            xs={12}
            sm={6}
          >
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              required
              placeholder='Last Name'
              value={familyName}
              onChange={(e) => {
                setFamilyName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='email'
            xs={12}
            sm={6}
          >
            <Form.Label>Email *</Form.Label>
            <Form.Control
              required
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            className='pb-2'
            as={Col}
            controlId='username'
            xs={12}
            sm={6}
          >
            <Form.Label>Username *</Form.Label>
            <Form.Control
              required
              placeholder='Select a username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='password'
            xs={12}
            sm={6}
          >
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type='password'
              required
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='confirmPassword'
            xs={12}
            sm={6}
          >
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type='password'
              required
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Container
          className='d-flex'
          fluid
          style={{ justifyContent: 'space-evenly' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {loading ? (
              <>
                <Spinner variant='dark' animation='grow' />
                <Spinner variant='dark' animation='grow' />
                <Spinner variant='dark' animation='grow' />
              </>
            ) : (
              'Already have an account?'
            )}
          </div>
          <div>
            {' '}
            <Button size='md' className='mx-1'>
              Login
            </Button>
            <Button onClick={submitHandler}>Register</Button>
          </div>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
