import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/PlayButton(swiperight).png'
import stopButton from '../../images/StopButton.png'
import LeftArrow from '../../images/LeftArrow.png'
import RightArrow from '../../images/RightArrow.png'

export function MatchDashboard() {

    //profiles will be needed to be fetched from the database
    const [slides, setSlides] = useState([]);
    //const [profile, setProfile] = useState();
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    //const [playlistTrackIds, setPlaylistTrackIds] = useState('');

    const loadPlaylistTracks = async (playlistId) => {
        try {
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
            //let string = await generatePlaylistIdString(trackList);
            //setPlaylistTrackIds(string);
            return trackList;
        } catch (error) {
            console.error(error.message)
        }
    }

    const generatePlaylistIdString = async (trackList) => {
        let string = '';
        await trackList.forEach(track => {
            trackList.indexOf(track) === trackList.length - 1 ? string += track.id : string += track.id + ',';
        })
        return string;
    }

    const calculateTrackQualities = async (trackIds) => {
        try {
            const response = await fetch(`http://localhost:4000/login/getPlaylistQualities/${trackIds}`);
            const parseRes = await response.json();
            const trackQualities = await parseRes.audio_features.map(track => ({
                acousticness: track.acousticness,
                danceability: track.danceability,
                energy: track.energy,
                instrumentalness: track.instrumentalness,
                liveness: track.liveness,
                valence: track.valence,
                tempo: track.tempo
            }))
            //console.log(trackQualities)
            const average = {
                acousticness: 0,
                danceability: 0,
                energy: 0,
                instrumentalness: 0,
                liveness: 0,
                valence: 0,
                tempo: 0
            }
            trackQualities.forEach(track => {
                for (const quality in track) {
                    average[quality] += track[quality];
                }
            })
            for (const quality in average) {
                average[quality] /= trackQualities.length;
            }
            console.log(average)
            return average;
        } catch (error) {
            console.error(error.message);
        }
    }

    const calculateDifference = (num1, num2) => {
        return Math.abs(num1 - num2);
    }

    const calculateMusicDiff = (yourAverageTrack, theirAverageTrack) => {
        const musicDiff = {
            acousticness: 0,
            danceability: 0,
            energy: 0,
            instrumentalness: 0,
            liveness: 0,
            valence: 0,
        };
        for (const quality in musicDiff) {
            musicDiff[quality] = calculateDifference(yourAverageTrack[quality], theirAverageTrack[quality]);
        }
        console.log(musicDiff)
        return musicDiff;
    }

    const calculatePercentMatch = (yourAverageTrack, theirAverageTrack) => {
        const musicDiff = calculateMusicDiff(yourAverageTrack, theirAverageTrack);
        const { acousticness, danceability, energy, instrumentalness, liveness, valence } = musicDiff;
        return Math.floor((1 - ((acousticness + danceability + energy + instrumentalness + liveness + valence) / 6)) * 100) + "% match"
    }


    const fetchProfile = async (id) => {
        const response = await fetch(`http://localhost:4000/profile/${id}`)
        const parseRes = await response.json();
        return parseRes;
    }

    const fetchThemeSong = async (themeSongId) => {
        const response = await fetch(`http://localhost:4000/login/theme_song/${themeSongId}`);
        const parseRes = await response.json();
        console.log(parseRes);
        return parseRes;
    }

    async function fetchData() {
        try {
            const profile = await fetchProfile(1);
            const profile2 = await fetchProfile(3);
            const playlist1 = await loadPlaylistTracks(profile.playlist_id);
            const playlist2 = await loadPlaylistTracks(profile2.playlist_id);
            const idString1 = await generatePlaylistIdString(playlist1);
            const idString2 = await generatePlaylistIdString(playlist2);
            const trackQualities1 = await calculateTrackQualities(idString1);
            const trackQualities2 = await calculateTrackQualities(idString2);
            const themeSong = await fetchThemeSong(profile2.theme_song_id);
            const profileInfo = [
                {
                    id: 0,
                    slideTitle: profile.first_name,
                    image: profile.photo,
                    percentMatch: await calculatePercentMatch(trackQualities1, trackQualities2)
                },
                {
                    id: 1,
                    slideTitle: 'their playlist',
                    trackList: await playlist1
                },
                {
                    id: 2,
                    slideTitle: 'theme song',
                    image: themeSong.album.images[0].url,
                    title: themeSong.name,
                    artist: themeSong.artists[0].name
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
                    musicDiff: await calculateMusicDiff(trackQualities1, trackQualities2),
                    yourTrackQualities: await trackQualities1,
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
                            key={slides[current].id}/>
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