import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';

const App = () => {

    return (
      <div>
        <h1>Blue Ocean</h1>
        <Viewer />
      </div>
    );
}

export default App;