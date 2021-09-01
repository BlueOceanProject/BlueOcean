import React, { useState, useEffect, useContext } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { GlobalContext } from './App.jsx';


const styles ={
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 18
  },
}

const logoutHandler = () => {
  console.log('log out');
};

const Toolbar = (props) => {

  const globalData = useContext(GlobalContext);
  const { query } = globalData.state;
  const { userId } = globalData.state;
  const tempUsername = userId;


  const handleSearchChange = (e) => {
    globalData.dispatch({type: 'updateQuery', data: e.target.value});
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={"https://i.imgur.com/rRcUk5O.png"} height="50" />{' '}
          Harmony
        </Navbar.Brand>

          <div className="mx-auto">
            <input type="text" placeholder="Search users..." onChange={handleSearchChange} value={query} />
          </div>

           <LinkContainer to="/">
            <Nav.Link> Feed </Nav.Link>
          </LinkContainer>

          {tempUsername !== ''
          ?
          <>
            <LinkContainer to="/user">
              <Nav.Link> Profiles  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/create" >
              <Nav.Link className="border-left pl-2 ml-auto"> Workstation  </Nav.Link>
            </LinkContainer>
          </>
          : ''
          }

        <Nav className="ms-auto">
          {tempUsername === ''
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
              <Nav.Link> {tempUsername}  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/feed">
              <Nav.Link onClick={logoutHandler}> Logout  </Nav.Link>
            </LinkContainer>
            </>
          }

        </Nav>
      </Navbar>
    </div>
  );
}

export default Toolbar;

