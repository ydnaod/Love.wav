import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar({ isAuthorized, handleAuthorization }) {

    const handleLogout = (e) => {
        handleAuthorization(false);
        sessionStorage.setItem('token', '')
    }

    const loggedIn = <nav id="nav1">
        <li>
            <Link to='/'>dashboard</Link>
        </li>
        <li>
            <Link to='/profile'>profile</Link>
        </li>
        <li>
            <Link to='/settings'>settings</Link>
        </li>
        <li>
            <Link to='/login' onClick={handleLogout}>logout</Link>
        </li>
    </nav>

    const loggedOut = <nav id="nav1">
        <li>
            <Link to='/register'>register</Link>
        </li>
        <li>
            <Link to='/login'>login</Link>
        </li>
    </nav>

    return (
        <Fragment>
            <div className="NavBar">
                <div className="logo">
                    <h1 id="logo">love.wav</h1>
                </div>
                {isAuthorized ? loggedIn : loggedOut}
            </div>
        </Fragment>
    )
}