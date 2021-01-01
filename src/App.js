import './App.css';
import React, {useState, useEffect, Fragment} from 'react';
import {NavBar} from './Components/NavBar/NavBar';
import {MessageList} from './Components/MessageList/MessageList';
import {MatchDashboard} from './Components/MatchDashboard/MatchDashboard';

function App() {
  return (
    <Fragment>
      <NavBar />
    </Fragment>
  );
}

export default App;
