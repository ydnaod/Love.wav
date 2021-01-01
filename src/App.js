import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { NavBar } from './Components/NavBar/NavBar';
import { MessageList } from './Components/MessageList/MessageList';
import { MatchDashboard } from './Components/MatchDashboard/MatchDashboard';

function App() {
  return (
    <Fragment>
      <div className="App">
        <NavBar />
        <div className="dashboard">
          <MatchDashboard />
          <MessageList />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
