import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { NavBar } from './Components/NavBar/NavBar';
import { ConversationList } from './Components/ConversationList/ConversationList';
import { MatchDashboard } from './Components/MatchDashboard/MatchDashboard';
import { Login } from './Components/Login/Login';
import { Settings } from './Components/Settings/Settings';
import { EditProfile } from './Components/EditProfile/EditProfile';
import { Register } from './Components/Register/Register';
// import { ProfilePicture } from './Components/ProfilePicture/ProfilePicture';
// import { YourPlaylist } from './Components/YourPlaylist/YourPlaylist';
// import { YourThemeSong } from './Components/YourThemeSong/YourThemeSong';
// import { FavoriteLyric } from './Components/FavoriteLyric/FavoriteLyric';
const restAPIUrl = require('./Util/serverUrl');

function App(props) {

  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorization = (boolValue) => {
    setIsAuthorized(boolValue);
  }

  const fetchUserId = async () => {
    const response = await fetch(`${restAPIUrl.url}/account/getId`, {
      method: 'GET',
      headers: { token: sessionStorage.token }
    });
    const parseRes = await response.json();
    return parseRes;
  }

  const dashboard = <div className="dashboard">
    <MatchDashboard fetchUserId={fetchUserId} />
    <ConversationList fetchUserId={fetchUserId} />
  </div>

  const isAuth = async () => {
    try {
      const response = await fetch(`${restAPIUrl.url}/account/verify`, {
        method: 'GET',
        headers: { token: sessionStorage.token }
      });
      const parseRes = await response.json();
      //console.log(parseRes)
      handleAuthorization(parseRes);
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    isAuth();
  }, [])

  return (
    <Router >
      <Fragment>
        <div className="App">
          <div className='App-Content'>
            <NavBar isAuthorized={isAuthorized}
              handleAuthorization={handleAuthorization} />
            <Switch>
              <Route exact path="/" render={props => isAuthorized ? dashboard : <Redirect to='/login' />} />
              <Route exact path='/profile'>
                <EditProfile fetchUserId={fetchUserId} />
              </Route>
              <Route exact path='/settings'>
                <Settings fetchUserId={fetchUserId} />
              </Route>
              <Route exact path='/login' render={props => !isAuthorized ? <Login isAuthorized={isAuthorized}
                handleAuthorization={handleAuthorization} /> : <Redirect to='/' />} />
              <Route exact path='/register' render={props => !isAuthorized ? <Register isAuthorized={isAuthorized}
                handleAuthorization={handleAuthorization} /> : <Redirect to='/' />} />
            </Switch>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
