import React, { useState, useEffect, useContext } from 'react';
import './toolbar.css';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import "@fontsource/staatliches/index.css"
import { Nav, Navbar, Button } from 'react-bootstrap';
import { GlobalContext } from './App.jsx';
import { useAuth } from './Authentication/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
    fontSize: '50px',
    marginTop: "-15px",
    marginBottom: "-15px",
  },
  background: {
    backgroundColor: "#2a2b5c",
  },
  image: {
    height:"80px",
    marginTop: "-30px",
    marginBottom: "-30px",
  }
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
      <Navbar style={styles.background} >
        <Navbar.Brand style={styles.logo}>
          <img src={"https://i.imgur.com/B5cQ49u.png"} style={styles.image}  />{' '}
            Harmony
        </Navbar.Brand>

        <LinkContainer to="/">
            <Nav.Link> <i class="fa fa-home"></i> Feed </Nav.Link>
          </LinkContainer>

          {userId !== ''
          ?
          <>
            <LinkContainer to="/user">
              <Nav.Link> <i class="fa fa-user"></i> Profiles  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/create" >
              <Nav.Link className="nav-link" > <i class="fa fa-music"></i> Workstation  </Nav.Link>
            </LinkContainer>
          </>
          : ''
          }


          <div className="ms-auto">
            <i class="fa fa-search" style={{color: '#FFFFFF'}}></i>
            {' '}
            <input type="text" placeholder="Search users..." onChange={handleSearchChange} value={query} />
          </div>




        <Nav className="ms-auto">
          {userId === ''
          ?
          <>
            <LinkContainer to="/signin">
                <Nav.Link> <i class="fa fa-sign-in"></i> Log in  </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/signup">
              <Nav.Link> <i class="fa fa-user-plus"></i> Sign up  </Nav.Link>
            </LinkContainer>
          </>
          :
          <>
            <LinkContainer to="/user">
              <Nav.Link> <i class="fa fa-user"></i> { username }  </Nav.Link>
            </LinkContainer>


              <Nav.Link onClick={logoutHandler}> <i class="fa fa-sign-out"></i> Log Out </Nav.Link>


            {/* <Button variant="link" >  <i class="fa fa-sign-out"></i> Log out</Button> */}
          </>
          }



        </Nav>
      </Navbar>
    </div>
  );
}

export default Toolbar;

