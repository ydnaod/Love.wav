import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { NavBar } from './Components/NavBar/NavBar';
import { MessageList } from './Components/MessageList/MessageList';
import { MatchDashboard } from './Components/MatchDashboard/MatchDashboard';
import Cookies from 'universal-cookie';

function App(props) {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const cookies = new Cookies();


  useEffect( async () => {
    if(cookies.get('spotify_auth_state') && !isAuthorized){
      try {
        console.log(props);
        const search = props.location.search
        let params = new URLSearchParams(search);
        console.log(search + params);
        const url = 'http://localhost:4000/login/callback/'
        const request = await fetch(url,
        {
          method: "GET",
          headers: {"Content-Type":"application/json"},
        })
      } catch (error) {
        console.error(error.message);
      }

    }
  }, [isAuthorized])

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
