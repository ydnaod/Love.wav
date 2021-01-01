import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/PlayButton(swiperight).png'
import stopButton from '../../images/StopButton.png'

export function MatchDashboard() {
    return (
        <Fragment>
            <div className="MatchDashboard">
                <Profile />
                <div>
                    <h1 className="name">Summer L.</h1>
                    <div className = "buttons">
                        <img className="button" src={playButton}></img>
                        <img className="button" src={stopButton}></img>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}