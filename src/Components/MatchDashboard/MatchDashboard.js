import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/PlayButton(swiperight).png'
import stopButton from '../../images/StopButton.png'
import LeftArrow from '../../images/LeftArrow.png'
import RightArrow from '../../images/RightArrow.png'
import { Spotify } from '../../Util/Spotify';

export function MatchDashboard() {

    const loadPlaylistTracks = async () => {
        try {
            const response = await fetch(`http://localhost:4000/login/loadPlaylistTracks`);
            const parseRes = await response.json();
            console.log(parseRes);
            const trackList = await parseRes.items.map(track => ({
                id: track.track.id,
                name: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri,
                preview_url: track.track.preview_url
            }))
            return trackList;
        } catch (error) {
            console.error(error.message)
        }
    }

    //profile will be needed to be fetched from the database
    const [profiles, setProfiles] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            const profileInfo = [
                {
                    id: 0,
                    slideTitle: 'Summer L.',
                    image: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/134969333_10225175813162837_4579429098583903124_o.jpg?_nc_cat=103&ccb=2&_nc_sid=730e14&_nc_ohc=7mpxbX422BUAX-r2y0B&_nc_ht=scontent-lga3-1.xx&oh=c1ac92375280c033abdc95fda17b1f1a&oe=601BC1B8',
                    percentMatch: '97% match'
                },
                {
                    id: 1,
                    slideTitle: 'their playlist',
                    trackList: await loadPlaylistTracks()
                },
                {
                    id: 2,
                    slideTitle: 'theme song',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SX522_.jpg',
                    title: '"Adore You"',
                    artist: 'Harry Styles'
                },
                {
                    id: 3,
                    slideTitle: 'guess their favorite lyric',
                    lyrics: [
                        "You are sick, and you're married",
                        "And you might be dying",
                        "But you're holding me like water in your hands",
                        "When you saw the dead little bird, you started crying",
                        "But you know the killer doesn't understand"
                    ],
                    favoriteLyric: "But you're holding me like water in your hands",
                    title: '"Moon Song"',
                    artist: 'Phoebe Bridgers',
                    album: "Punisher",
                    image: "https://upload.wikimedia.org/wikipedia/en/2/23/Phoebe_Bridgers_Punisher_%282020%29.png"
                },
                {
                    id: 4,
                    slideTitle: ['it seems you both like', 'you can show them'],
                    trackQualities: {
                        acousticness: .3,
                        danceability: .7,
                        energy: .6,
                        instrumentalness: .09,
                        liveness: .159,
                        valence: .6
                    },
                    tempo: 100
                },
            ]
            setProfiles(profileInfo);
            setIsLoading(false);
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


    useEffect(async () => {
        fetchData();
    }, [])



    return (
        <Fragment>
            <div className="MatchDashboard">
                <div className="profileSection">
                    <img src={LeftArrow} onClick={handleLeftArrowClick}></img>

                    {
                        isLoading ? <p>isLoading</p> : <Profile profileInfo={profiles[current]}
                        key={profiles[current].id} />
                    }

                    <img src={RightArrow} onClick={handleRightArrowClick}></img>
                </div>
                <div className="nameSection">
                    <div className="buttons">
                        <img className="button" src={stopButton}></img>
                        <img className="button" src={playButton}></img>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}