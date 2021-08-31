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

  },
  right: {
    marginLeft: 'auto',
    marginRight: '0',
  }
}

const Toolbar = (props) => {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={"https://i.imgur.com/rRcUk5O.png"} height="50" />{' '}
          Harmony
        </Navbar.Brand>

        <Nav className="justify-content-center">
          <LinkContainer to="/">
            <Nav.Link> Feed </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/users">
            <Nav.Link> Profiles  </Nav.Link>
          </LinkContainer>

            <LinkContainer to="/create" >
              <Nav.Link className="border-left pl-2 ml-auto"> Workstation  </Nav.Link>
            </LinkContainer>


          {/* {props.username === ''
          ?
          <div style={styles.row}>
            <LinkContainer to="/login">
                <Nav.Link> Login  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/signup">
              <Nav.Link> Signup  </Nav.Link>
            </LinkContainer>
          </div>
          :
            <div style={styles.row} className="ml-auto">
              <LinkContainer to="/username">
                <Nav.Link> {props.username}  </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/Logout">
                <Nav.Link> Logout  </Nav.Link>
              </LinkContainer>
            </div>
          } */}



        </Nav>
      </Navbar>
    </div>
  );
}

export default Toolbar;