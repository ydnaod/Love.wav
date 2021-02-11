import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/Playbutton.png'
import stopButton from '../../images/StopButton.png'
// import LeftArrow from '../../images/LeftArrow.png'
// import RightArrow from '../../images/RightArrow.png'
import { LoadingMatchDashboard } from './LoadingMatchDashboard'
import {Popup} from '../Popup/Popup'
const restAPIUrl = require('../../Util/serverUrl')

export function MatchDashboard({ fetchUserId }) {

    //profiles will be needed to be fetched from the database
    const [slides, setSlides] = useState([]);
    //const [profile, setProfile] = useState();
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    //const [playlistTrackIds, setPlaylistTrackIds] = useState('');
    const [profiles, setProfiles] = useState();
    const [hasError, setHasError] = useState(false);

    const loadPlaylistTracks = async (playlistId) => {
        try {
            const response = await fetch(`${restAPIUrl.url}/login/loadPlaylistTracks/${playlistId}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
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
            console.log('yay error handling loadingPlaylistTracks')
            console.error(error.message);
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
            const response = await fetch(`${restAPIUrl.url}/login/getPlaylistQualities/${trackIds}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
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
            console.log('yay error handling calculateTrackQualities')
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
        try {
            const response = await fetch(`${restAPIUrl.url}/profile/${id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            })
            if(response.status == 400){
                throw new Error('Profile is incomplete')
            }
            const parseRes = await response.json();
            return parseRes;
        } catch (error) {
            //console.log('yay error handling fetchProfile')
            setHasError(true);
            console.error(error.message);
        }
    }

    const fetchThemeSong = async (themeSongId) => {
        try {
            const response = await fetch(`${restAPIUrl.url}/login/theme_song/${themeSongId}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes);
            return parseRes;
        } catch (error) {
            console.log('yay error handling fetchThemeSong')
            console.error(error.message);
        }
    }

    const fetchFavoriteLyrics = async (id) => {
        try {
            const response = await fetch(`${restAPIUrl.url}/lyrics/${id}/favorite/`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            parseRes.lyrics = [];
            parseRes.lyrics.push(parseRes.line_one);
            parseRes.lyrics.push(parseRes.line_two);
            parseRes.lyrics.push(parseRes.line_three);
            parseRes.lyrics.push(parseRes.line_four);
            parseRes.lyrics.push(parseRes.line_five);
            return parseRes;
        } catch (error) {
            console.log('yay error handling fetchFavoriteLyrics')
            console.error(error.message);
        }
    }

    async function fetchData() {
        try {
            const userId = await fetchUserId();
            const profile = await fetchProfile(profiles[0].id);
            //console.log(profile)
            const profile2 = await fetchProfile(userId);
            const playlist1 = await loadPlaylistTracks(profile.playlist_id);
            const playlist2 = await loadPlaylistTracks(profile2.playlist_id);
            const idString1 = await generatePlaylistIdString(playlist1);
            const idString2 = await generatePlaylistIdString(playlist2);
            const trackQualities1 = await calculateTrackQualities(idString1);
            const trackQualities2 = await calculateTrackQualities(idString2);
            const themeSong = await fetchThemeSong(profile.theme_song_id);
            const favoriteLyrics = await fetchFavoriteLyrics(profiles[0].id);
            const profileInfo =
            {

                name: profile.first_name,
                image: profile.photo,
                percentMatch: await calculatePercentMatch(trackQualities1, trackQualities2),
                trackList: await playlist1,
                themeSongImage: themeSong.album.images[0].url,
                title: themeSong.name,
                artist: themeSong.artists[0].name,
                lyrics: favoriteLyrics.lyrics,
                favoriteLyric: favoriteLyrics.favorite_lyric,
                favoriteLyricTitle: favoriteLyrics.song_title,
                favoriteLyricArtist: favoriteLyrics.song_artist,
                musicDiff: await calculateMusicDiff(trackQualities1, trackQualities2),
                yourTrackQualities: await trackQualities1,
            }


            setSlides(profileInfo);
            setIsLoading(false);
        } catch (error) {
            console.log('yay error handling fetchData')
            console.error(error.message);
        }
    }

    const handleLeftArrowClick = () => {
        setCurrent(current == 0 ? slides.length - 1 : current - 1);
    }

    const handleRightArrowClick = () => {
        setCurrent(current == slides.length - 1 ? 0 : current + 1);
    }

    const fetchRandomProfiles = async () => {
        try {
            const response = await fetch(`${restAPIUrl.url}/fetch-profiles/random`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            const tempArray = [];
            parseRes.map(id => tempArray.push(id));
            setProfiles(tempArray)
            console.log(tempArray);
        } catch (error) {
            console.error(error.message);
        }
    }

    const matchNotification = async () => {
        console.log('You got a match!')
    }

    const handleSwipe = async (swipe) => {
        try {
            const body = {
                swiped: swipe,
                user_account_id: await fetchUserId(),
                other_user_account_id: profiles[0].id
            }
            const tempArray = profiles;
            const response = await fetch(`${restAPIUrl.url}/swipes`, {
                method: 'POST',
                headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            console.log(parseRes);
            if (parseRes.match === true) {
                matchNotification();
            }
            tempArray.shift();
            //console.log(tempArray)
            setProfiles(tempArray)
            setIsLoading(true);
            fetchData();
        } catch (error) {
            console.error(error.message);
        }
    }

    const emptyProfilesArray = () => {
        setProfiles();
        setHasError(false);
    }

    useEffect(async () => {
        fetchData();
    }, [profiles])


    const profileSection =
        <Fragment>
            <div className="profileSection">
                <div className='entireProfile glass'>
                    {
                        isLoading ? <LoadingMatchDashboard /> : <Profile profileInfo={slides}
                            key='1' />
                    }
                </div>
            </div>
            <div className="nameSection">
                <div className="buttons">
                    <img onClick={() => handleSwipe('left')} className="dashboardButton" src={stopButton}></img>
                    <img onClick={() => handleSwipe('right')} className="dashboardButton" src={playButton}></img>
                </div>
            </div>
        </Fragment>


    const findProfiles = <div className="findMatches">

        <button onClick={fetchRandomProfiles} className='button'>roll the die</button>

    </div>

    return (
        <Fragment>
            <div className="MatchDashboard">
                {
                    profiles ? profileSection : findProfiles
                }
                {
                    hasError ? <Popup hasError={hasError}
                        emptyProfilesArray={emptyProfilesArray}
                        isSeen={true}
                        lyrics={[]}/> : ''
                }
            </div>
        </Fragment>
    )
}