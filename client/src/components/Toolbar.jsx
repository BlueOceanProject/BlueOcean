import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


const styles ={
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 18
  },
  right: {
    margin: 0,
    top: 0,
    right: 60,
    bottom:20,
    left: 'auto',
    position: 'fixed',
  }
}

const clickHandler = () => {
  console.log('log out');
};



const Toolbar = (props) => {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={"https://i.imgur.com/rRcUk5O.png"} height="50" />{' '}
          Harmony
        </Navbar.Brand>

          <div className="mx-auto">
            <input type="text" placeholder="Search users..." />
          </div>

           <LinkContainer to="/">
            <Nav.Link> Feed </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/user">
            <Nav.Link> Profiles  </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/create" >
            <Nav.Link className="border-left pl-2 ml-auto"> Workstation  </Nav.Link>
          </LinkContainer>

        <Nav className="ms-auto">
          {props.username === ''
          ?
          <>
            <LinkContainer to="/signin">
                <Nav.Link> Log in  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/signup">
              <Nav.Link> Sign up  </Nav.Link>
            </LinkContainer>
          </>
          :
          <>
            <LinkContainer to="/user">
              <Nav.Link> {props.username}  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/feed">
              <Nav.Link> Logout  </Nav.Link>
            </LinkContainer>
            </>
          }

        </Nav>
      </Navbar>
    </div>
  );
}

export default Toolbar;

