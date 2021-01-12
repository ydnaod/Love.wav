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
                <nav>
                    <a>
                        <Link to='/'>dashboard</Link>
                    </a>
                    <a>
                        <Link to='/profile'>profile</Link>
                    </a>
                    <a>
                        <Link to='/settings'>settings</Link>
                    </a>
                    <a>
                        <Link to='/login'>logout</Link>
                    </a>
                </nav>
            </div>
        </Fragment>
    )
}