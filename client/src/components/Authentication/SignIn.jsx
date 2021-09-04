import React, { useRef, useState, useEffect } from 'react';
import {
  Card, Form, Button, Container, Alert,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { signIn } = useAuth();

  const signInHandler = (event) => {
    event.preventDefault();

    setErrorMessage('');
    setLoading(true);

    signIn(emailRef.current.value, passwordRef.current.value)
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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px', color: 'black' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" ref={passwordRef} required />
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={signInHandler} disabled={loading}>Sign In</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" style={{ color: 'white' }}>
          {' '}
          Need an account?
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
