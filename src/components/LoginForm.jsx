import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setEmail('');
      setPassword('');
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginUser(user));
  };

  return !userInfo ? (
    <div className='d-flex' style={{ background: 'wheat' }}>
      <div>
        <Form as={Row} onSubmit={submitHandler}>
          <Form.Group as={Col} controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form>
      </div>
      <Button onClick={submitHandler} className='mx-1'>
        Login
      </Button>
    </div>
  ) : null;
};

export default LoginForm;
