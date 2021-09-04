import React, { useState, useEffect, useContext } from 'react';
import './toolbar.css';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '@fontsource/staatliches/index.css';
import { GlobalContext } from './App.jsx';
import { useAuth } from './Authentication/AuthContext';

const styles = {
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 18,
  },
  logo: {
    fontFamily: 'Staatliches',
    color: '#d4fce4',
    fontSize: '50px',
    marginTop: '-15px',
    marginBottom: '-15px',
  },
  background: {
    backgroundColor: '#2a2b5c',
    borderBottom: '2px solid var(--clr-border)',

  },
  image: {
    height: '80px',
    marginTop: '-30px',
    marginBottom: '-30px',
  },
};

const Toolbar = () => {
  const globalData = useContext(GlobalContext);
  const { query, userId, theme } = globalData.state;
  const [username, setUsername] = useState('');
  const { signout } = useAuth();
  const history = useHistory();

  const handleSearchChange = (e) => {
    globalData.dispatch({ type: 'updateQuery', data: e.target.value });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    signout()
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (userId) {
      axios.get(`/username/${userId}`)
        .then((res) => {
          setUsername(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setUsername('');
    }
  }, [userId]);

  return (
    <div>
      <Navbar style={styles.background} fixed="top">
        <Navbar.Brand style={styles.logo}>
          <img src="https://i.imgur.com/B5cQ49u.png" style={styles.image} />
          {' '}
          Harmony
        </Navbar.Brand>

        <LinkContainer to="/">
          <Nav.Link>
            {' '}
            <i className="fa fa-home" />
            {' '}
            Feed
          </Nav.Link>
        </LinkContainer>

        {userId !== ''
          ? (
            <>
              <LinkContainer to="/user">
                <Nav.Link>
                  {' '}
                  <i className="fa fa-user" />
                  {' '}
                  Profiles
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/create">
                <Nav.Link className="nav-link">
                  {' '}
                  <i className="fa fa-music" />
                  {' '}
                  Workstation
                </Nav.Link>
              </LinkContainer>
            </>
          )
          : ''}

        <div className="ms-auto no-wrap">
          <i className="fa fa-search" style={{ color: '#FFFFFF' }} />
          {' '}
          <input type="text" placeholder="Search users..." onChange={handleSearchChange} value={query} />
        </div>

        <Nav className="ms-auto">
          {userId === ''
            ? (
              <>
                <LinkContainer to="/signin">
                  <Nav.Link>
                    {' '}
                    <i className="fa fa-sign-in" />
                    {' '}
                    Log in
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/signup">
                  <Nav.Link>
                    {' '}
                    <i className="fa fa-user-plus" />
                    {' '}
                    Sign up
                  </Nav.Link>
                </LinkContainer>
              </>
            )
            : (
              <>
                <LinkContainer to="/user">
                  <Nav.Link>
                    {' '}
                    <i className="fa fa-user" />
                    {' '}
                    {username}
                    {' '}
                  </Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={logoutHandler}>
                  {' '}
                  <i className="fa fa-sign-out" />
                  {' '}
                  Log Out
                </Nav.Link>
              </>
            )}

          <button
            type="button"
            className="btn btn-outline-light button"
            onClick={() => {
              globalData.dispatch({ type: 'updateTheme', data: (!theme) });
            }}
          >
            {theme ? 'Light' : 'Dark'}
          </button>

        </Nav>
      </Navbar>
    </div>
  );
};

export default Toolbar;
