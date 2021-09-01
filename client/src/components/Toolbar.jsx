import React, { useState, useEffect, useContext } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { GlobalContext } from './App.jsx';
import { useAuth } from './Authentication/AuthContext';
import { useHistory } from 'react-router-dom';

import axios from 'axios';


const styles ={
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 18
  },
}

const Toolbar = (props) => {

  const globalData = useContext(GlobalContext);
  const { query } = globalData.state;
  const { userId } = globalData.state;
  const [username, setUsername] = useState('');
  const { signout } = useAuth();
  const history = useHistory();

  const handleSearchChange = (e) => {
    globalData.dispatch({type: 'updateQuery', data: e.target.value});
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
          console.log(res);
          setUsername(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      setUsername('');
    }
  }, [userId]);

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

          {userId !== ''
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
          {userId === ''
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
              <Nav.Link> { username }  </Nav.Link>
            </LinkContainer>

            <Button variant="link" onClick={logoutHandler}>Log out</Button>
          </>
          }

        </Nav>
      </Navbar>
    </div>
  );
}

export default Toolbar;

