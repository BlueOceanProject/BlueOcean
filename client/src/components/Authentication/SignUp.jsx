import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { signUp } = useAuth();

  const signUpHandler = (event) => {
    event.preventDefault();

    setErrorMessage('');

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorMessage('passwords do not match!');
    }

    setLoading(true);

    signUp(emailRef.current.value, passwordRef.current.value)
      .then((userObj) => {
        const data = {
          _id: userObj.user.uid,
          userName: usernameRef.current.value,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          phoneNumber: phoneNumberRef.current.value
        };
        return axios.post('http://localhost:3000/users', data)
      })
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth:"600px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Sign Up</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form>
              <Form.Group className="mb-2" controlId="username">
                <Form.Label>Username <strong style={{ color: "red" }}>*</strong></Form.Label>
                <Form.Control type="text" placeholder="Enter username" ref={usernameRef} required/>
              </Form.Group>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-2" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" ref={firstNameRef} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2" controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" ref={lastNameRef} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-2" controlId="phoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" ref={phoneNumberRef} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email address <strong style={{ color: "red" }}>*</strong></Form.Label>
                <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password <strong style={{ color: "red" }}>*</strong></Form.Label>
                <Form.Control type="password" placeholder="Enter password" ref={passwordRef} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password-confirm">
                <Form.Label>Confirm password <strong style={{ color: "red" }}>*</strong></Form.Label>
                <Form.Control type="password" placeholder="Enter password again" ref={passwordConfirmRef} required/>
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={signUpHandler} disabled={loading}>Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2"> Have an account? <Link to="/signin">Sign in</Link></div>
      </div>
    </Container>
  );
};

export default SignUp;