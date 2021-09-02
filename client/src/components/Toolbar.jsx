import React, { useState, useEffect, useContext } from 'react';
import './toolbar.css';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { GlobalContext } from './App.jsx';
import "@fontsource/staatliches"

//green: #d4fce4
//navy: #2a2b5c


const styles ={
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 18
  },
  logo: {
    fontFamily: "Staatliches",
    color: '#d4fce4',
    fontSize: '50px'
  },
  background: {
    backgroundColor: "#2a2b5c",
  }
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
      <Navbar style={styles.background}>
        <Navbar.Brand style={styles.logo}>
          <img src={"https://i.imgur.com/B5cQ49u.png"} height="50" />{' '}
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
              <Nav.Link> <i class="fa fa-user"></i> Profiles  </Nav.Link>
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

