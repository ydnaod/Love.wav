import React, { useState, useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import './NavBar.css';

export function NavBar() {
    return (
        <Fragment>
            <div className="NavBar">
                <div className="logo">
                    <h1 id="logo">love.wav</h1>
                </div>
                <nav id="nav">
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
                        <Link to='/login'>logout</Link>
                    </li>
                </nav>
            </div>
        </Fragment>
    )
}