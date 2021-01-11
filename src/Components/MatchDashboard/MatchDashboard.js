import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/PlayButton(swiperight).png'
import stopButton from '../../images/StopButton.png'
import LeftArrow from '../../images/LeftArrow.png'
import RightArrow from '../../images/RightArrow.png'
import { Spotify } from '../../Util/Spotify';

export function MatchDashboard() {

    //profiles will be needed to be fetched from the database
    const [slides, setSlides] = useState([]);
    //const [profile, setProfile] = useState();
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [playlistTrackIds, setPlaylistTrackIds] = useState('');

    const loadPlaylistTracks = async (playlistId) => {
        try {
            let string = '';
            const response = await fetch(`http://localhost:4000/login/loadPlaylistTracks/${playlistId}`);
            const parseRes = await response.json();
            //console.log(parseRes);
            const trackList = await parseRes.items.map(track => ({
                id: track.track.id,
                name: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri,
                preview_url: track.track.preview_url
            }))
            trackList.forEach(track => {
                trackList.indexOf(track) === trackList.length - 1 ? string += track.id : string += track.id + ',';
            })
            setPlaylistTrackIds(string);
            calculateTrackQualities(playlistTrackIds);
            return trackList;
        } catch (error) {
            console.error(error.message)
        }
    }

    const calculateTrackQualities = async (trackIds) => {
        try {
            const response = await fetch(`http://localhost:4000/login/getPlaylistQualities/${trackIds}`);
            const parseRes = await response.json();
            console.log(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }

    const calculatePercentMatch = () => {

    }

    const fetchProfile = async () => {
        const response = await fetch('http://localhost:4000/profile')
        const parseRes = await response.json();
        return parseRes;
    }

    async function fetchData() {
        try {
            const profile = await fetchProfile();
            const profileInfo = [
                {
                    id: 0,
                    slideTitle: profile.first_name,
                    image: profile.photo,
                    percentMatch: '97% match'
                },
                {
                    id: 1,
                    slideTitle: 'their playlist',
                    trackList: await loadPlaylistTracks(profile.playlist_id)
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
            setSlides(profileInfo);
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleLeftArrowClick = () => {
        setCurrent(current == 0 ? slides.length - 1 : current - 1);
    }

    const handleRightArrowClick = () => {
        setCurrent(current == slides.length - 1 ? 0 : current + 1);
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
                        isLoading ? <p>isLoading</p> : <Profile profileInfo={slides[current]}
                            key={slides[current].id} />
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