import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';

const styles ={
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  }
}

const Toolbar = () => {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={"https://i.imgur.com/rRcUk5O.png"} height="50" />
          Logo
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Toolbar;