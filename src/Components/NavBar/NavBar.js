import React, { useState, useEffect, Fragment } from 'react';
import './NavBar.css';

export function NavBar() {
    return (
        <Fragment>
            <div className="NavBar">
                <div className="logo">
                    <h1 id="logo">love.wav</h1>
                </div>
                <nav>
                    <a href="/">settings</a>
                    <a href="/">account</a>
                    <a href="/">logout</a>
                </nav>
            </div>
        </Fragment>
    )
}