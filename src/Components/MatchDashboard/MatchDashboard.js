import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/PlayButton(swiperight).png'
import stopButton from '../../images/StopButton.png'
import LeftArrow from '../../images/LeftArrow.png'
import RightArrow from '../../images/RightArrow.png'

export function MatchDashboard() {

    const [profiles, setProfiles] = useState([
        {
            id: 0,
            slideTitle: 'theme song',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
            title: '"Adore You"',
            artist: 'Harry Styles'
        },
        {
            id: 1,
            slideTitle: 'their playlist',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
            title: '"Adore You"',
            artist: 'Harry Styles'
        },
        {
            id: 2,
            slideTitle: 'guess their favorite lyric',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
            title: '"Adore You"',
            artist: 'Harry Styles'
        },
        {
            id: 3,
            slideTitle: 'what you both like',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
            title: '"Adore You"',
            artist: 'Harry Styles'
        },
        {
            id: 4,
            slideTitle: '% match',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
            title: '"Adore You"',
            artist: 'Harry Styles'
        }
    ]);
    const [current, setCurrent] = useState(0);

    function fetchData() {
        try {
            const profileInfo = [
                {
                    id: 0,
                    slideTitle: 'theme song',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                },
                {
                    id: 1,
                    slideTitle: 'their playlist',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                },
                {
                    id: 2,
                    slideTitle: 'guess their favorite lyric',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                },
                {
                    id: 3,
                    slideTitle: 'what you both like',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                },
                {
                    id: 4,
                    slideTitle: '% match',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                }
            ]
            setProfiles(profileInfo);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleLeftArrowClick = () => {
        setCurrent(current == 0 ? profiles.length - 1 : current - 1);
    }

    const handleRightArrowClick = () => {
        setCurrent(current == profiles.length - 1 ? 0 : current + 1);
    }

    useEffect(() => {
        //fetchData();
    }, [])


    /*profiles.map(profile => {
                        return <Profile profileInfo={profile}
                        key={profile.id} />
                    })
                    
                    <Profile profileInfo={profile[current]}
                        key={profile[current].id} />*/

    return (
        <Fragment>
            <div className="MatchDashboard">
                <div className="profileSection">
                    <img src={LeftArrow} onClick={handleLeftArrowClick}></img>

                    <Profile profileInfo={profiles[current]}
                        key={profiles[current].id} />

                    <img src={RightArrow} onClick={handleRightArrowClick}></img>
                </div>
                <div className="nameSection">
                    <h1 className="name">Summer L.</h1>
                    <div className="buttons">
                        <img className="button" src={playButton}></img>
                        <img className="button" src={stopButton}></img>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}