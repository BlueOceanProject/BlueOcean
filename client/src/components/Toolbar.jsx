import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


const styles ={
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  }
}

const clickHandler = () => {
  console.log('log out');
};

const Toolbar = () => {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={"https://i.imgur.com/rRcUk5O.png"} height="50" />{' '}
          Harmony
        </Navbar.Brand>

        <Nav>
          <LinkContainer to="/">
            <Nav.Link> Feed </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/users">
            <Nav.Link> Profiles  </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/create">
            <Nav.Link> Workstation  </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/signin">
            <Nav.Link> Sign in  </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/signup">
            <Nav.Link> Sign up  </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Toolbar;