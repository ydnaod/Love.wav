import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/PlayButton(swiperight).png'
import stopButton from '../../images/StopButton.png'

export function MatchDashboard() {

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        try {
            const profileInfo = [
                {
                    id:1,
                    slideTitle: 'theme song',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                }
            ]
            setProfile(profileInfo);
        } catch (error) {
            console.error(error.message);
        }
    }, [])

    return (
        <Fragment>
            <div className="MatchDashboard">
                {
                    profile.map(profile => {
                    return <Profile profileInfo={profile}
                    key={profile.id}/>})
                    
                }
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