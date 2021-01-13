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
import { Login } from './Components/Login/Login';
import { Settings } from './Components/Settings/Settings';
import { EditProfile } from './Components/EditProfile/EditProfile';
import { Register } from './Components/Register/Register'
import Cookies from 'universal-cookie';

function App(props) {

  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorization = (boolValue) => {
    setIsAuthorized(boolValue);
  }

  const dashboard = <div className="dashboard">
    <MatchDashboard />
    <MessageList />
  </div>

  useEffect(async () => {
  }, [])

  return (
    <Router >
      <Fragment>
        <div className="App">
          <NavBar isAuthorized={isAuthorized}
            handleAuthorization={handleAuthorization} />
          <Switch>
            <Route exact path="/" render={props => isAuthorized ? dashboard : <Redirect to='/login'/>} />
            <Route exact path='/profile'>
              <EditProfile />
            </Route>
            <Route exact path='/settings'>
              <Settings />
            </Route>
            <Route exact path='/login' render={props => !isAuthorized ? <Login isAuthorized={isAuthorized}
              handleAuthorization={handleAuthorization} /> : <Redirect to='/' />} />
            <Route exact path='/register' render={props => !isAuthorized ? <Register isAuthorized={isAuthorized}
              handleAuthorization={handleAuthorization} /> : <Redirect to='/' />} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
