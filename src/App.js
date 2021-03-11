import './App.css';
import React, { useState, useEffect, Fragment, useRef } from 'react';
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
import {AudioObject} from './Components/AudioObject/AudioObject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ProfilePicture } from './Components/ProfilePicture/ProfilePicture';
// import { YourPlaylist } from './Components/YourPlaylist/YourPlaylist';
// import { YourThemeSong } from './Components/YourThemeSong/YourThemeSong';
// import { FavoriteLyric } from './Components/FavoriteLyric/FavoriteLyric';
const restAPIUrl = require('./Util/serverUrl');

toast.configure();
function App(props) {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [isAlreadyPlayingSample, setIsAlreadyPlayingSample] = useState();
  const song = useRef();

  const handleAuthorization = (boolValue) => {
    setIsAuthorized(boolValue);
  }

  const fetchUserId = async () => {
    const response = await fetch(`${restAPIUrl.url}/account/getId`, {
      method: 'GET',
      headers: { token: sessionStorage.token }
    });
    if (response.status === 403) {
      //console.log(response)
      setIsAuthorized(false);
    }
    const parseRes = await response.json();
    return parseRes;
  }

  const handlePlaySample = (previewUrl) => {
    if (!isAlreadyPlayingSample) {
     // audioObject = new Audio(previewUrl);
    //setInterval(() => {this.setState({isPlaying: false})}, 30000)
    setIsPlayingSample(previewUrl);
    song.current = new Audio(previewUrl);
    song.current.play();
    setIsAlreadyPlayingSample(true);
    console.log(song);
    }
    else {
      //audioObject.pause();
      song.current.pause();
      setIsPlayingSample(false);
    }
}

// playSample(track){
//   if(this.state.isPlaying){
//     this.audioObject.pause();
//     this.setState({isPlaying: false})
//   }
//   else{
//     this.audioObject = new Audio(track.preview_url);
//     setInterval(() => {this.setState({isPlaying: false})}, 30000)
//     this.audioObject.play();
//     this.setState({isPlaying: true})
//   }
// }

  const handleStopSample = (boolean) => {
    setIsAlreadyPlayingSample(boolean);
  }

  const dashboard = <div className="dashboard">
    <MatchDashboard fetchUserId={fetchUserId} 
      handlePlaySample={handlePlaySample}/>
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
                <EditProfile fetchUserId={fetchUserId}
                />
              </Route>
              <Route exact path='/settings'>
                <Settings fetchUserId={fetchUserId} />
              </Route>
              <Route exact path='/login' render={props => !isAuthorized ? <Login isAuthorized={isAuthorized}
                handleAuthorization={handleAuthorization} /> : <Redirect to='/' />} />
              <Route exact path='/register' render={props => !isAuthorized ? <Register isAuthorized={isAuthorized}
                handleAuthorization={handleAuthorization} /> : <Redirect to='/' />} />
            </Switch>
            {
              // !isAlreadyPlayingSample && isPlayingSample ? <AudioObject 
              // isPlayingSample={isPlayingSample}
              // handleIsPlayingSample={handleStopSample}
              // isAlreadyPlayingSample={isAlreadyPlayingSample}/> : ''
            }
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
