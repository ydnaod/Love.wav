import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { NavBar } from './Components/NavBar/NavBar';
import { MessageList } from './Components/MessageList/MessageList';
import { MatchDashboard } from './Components/MatchDashboard/MatchDashboard';
import {Login} from './Components/Login/Login';
import {Settings} from './Components/Settings/Settings';
import {EditProfile} from './Components/EditProfile/EditProfile';
import Cookies from 'universal-cookie';

function App(props) {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const cookies = new Cookies();


  useEffect(async () => {
    if (cookies.get('spotify_auth_state') && !isAuthorized) {
      try {
        console.log(props);
        const search = props.location.search
        let params = new URLSearchParams(search);
        console.log(search + params);
        const url = 'http://localhost:4000/login/callback/'
        const request = await fetch(url,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
      } catch (error) {
        console.error(error.message);
      }

    }
  }, [isAuthorized])

  return (
    <Router >
      <Fragment>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path = "/">
              <div className="dashboard">
                <MatchDashboard />
                <MessageList />
              </div>
            </Route>
            <Route exact path = '/profile'>
              <EditProfile />
            </Route>
            <Route exact path = '/settings'>
              <Settings />
            </Route>
            <Route exact path = '/login'>
              <Login />
            </Route>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
