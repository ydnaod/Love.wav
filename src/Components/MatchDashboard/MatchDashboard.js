import React, { useState, useEffect, Fragment } from 'react';
import { Profile } from '../Profile/Profile';
import './MatchDashboard.css';
import playButton from '../../images/Playbutton.png'
import stopButton from '../../images/StopButton.png'
import { LoadingMatchDashboard } from './LoadingMatchDashboard'
import { Popup } from '../Popup/Popup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const restAPIUrl = require('../../Util/serverUrl')

export function MatchDashboard({ fetchUserId, handlePlaySample }) {

    //This array is used to hold the different slide components of users' profiles
    const [slides, setSlides] = useState([]);

    //Set to false when data is fetched
    const [isLoading, setIsLoading] = useState(true);

    //Holds profiles to interate through after swiping
    const [profiles, setProfiles] = useState();

    //Set to true when there are no more profiles to iterate through
    const [isEmpty, setIsEmpty] = useState(false);

    //Set to true when error
    const [hasError, setHasError] = useState(false);

    //Fetches tracks from a user's playlist ID
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
            trackList.forEach(track => {
                if (!track.id) {
                    toast('sorry, one of your tracks was invalid');
                    throw new Error('sorry, one of your tracks was invalid')
                }
            })
            return trackList;
        } catch (error) {
            console.error(error.message);
        }
    }

    //Takes a list of tracks and generates a string of their ID's. This is needed to fetch the track qualities from Spotify's API
    const generatePlaylistIdString = async (trackList) => {
        let string = '';
        await trackList.forEach(track => {
            trackList.indexOf(track) === trackList.length - 1 ? string += track.id : string += track.id + ',';
        })
        return string;
    }

    //Takes the string of all the track ID's and returns an object holding the average of each quality across the 10 songs
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
                average[quality] /= trackQualities.length - 1;
            }
            console.table(average)
            return average;
        } catch (error) {
            console.error(error.message);
        }
    }

    const calculateDifference = (num1, num2) => {
        return Math.abs(num1 - num2);
    }

    //Finds the difference across the six track qualities between two users
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
        console.table(musicDiff)
        return musicDiff;
    }

    //Returns the % match between users based on the difference in their track qualities
    const calculatePercentMatch = (yourAverageTrack, theirAverageTrack) => {
        const musicDiff = calculateMusicDiff(yourAverageTrack, theirAverageTrack);
        const { acousticness, danceability, energy, instrumentalness, liveness, valence } = musicDiff;
        return Math.floor((1 - ((acousticness + danceability + energy + instrumentalness + liveness + valence) / 6)) * 100) + "% match"
    }

    //Fetches a new user from the database that the current user has not swiped yet
    const fetchProfile = async (id) => {
        try {
            const myId = await fetchUserId();
            const response = await fetch(`${restAPIUrl.url}/profile/${id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            })

            //Throws error if user's profile is incomplete
            if (response.status == 400 && id == myId) {
                throw new Error('Profile is incomplete')
            } else if ((response.status == 404 || response.status == 400) && id !== myId) {
                throw new Error('no profile exists for this user');
            }
            const parseRes = await response.json();
            return parseRes;
        } catch (error) {
            if (error.message) {
                if (error.message == 'Profile is incomplete') {
                    //toast.error('Profile is incomplete! Please check your profile to make sure it is complete.')
                    setHasError(true);
                    console.error(error.message);
                } else if (error.message == 'no profile exists for this user') {
                    const tempArray = profiles;
                    tempArray.shift();
                    if (tempArray.length == 0) {
                        setIsEmpty(true);
                    }
                    setProfiles(tempArray);
                    checkProfilesEmpty()
                    fetchData();
                }
            }
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
            //console.table(parseRes);
            parseRes.lyrics = [];
            parseRes.lyrics.push(parseRes.line_one);
            parseRes.lyrics.push(parseRes.line_two);
            parseRes.lyrics.push(parseRes.line_three);
            parseRes.lyrics.push(parseRes.line_four);
            parseRes.lyrics.push(parseRes.line_five);
            return parseRes;
        } catch (error) {
            console.error(error.message);
        }
    }

    //Fetches all user profile data to be rendered to the screen
    async function fetchData() {
        try {
            const userId = await fetchUserId();
            const theirProfile = await fetchProfile(profiles[0].id);
            const yourProfile = await fetchProfile(userId);
            const theirPlaylist = await loadPlaylistTracks(theirProfile.playlist_id);
            const yourPlaylist = await loadPlaylistTracks(yourProfile.playlist_id);
            const theirIdString = await generatePlaylistIdString(theirPlaylist);
            const yourIdString = await generatePlaylistIdString(yourPlaylist);
            const theirTrackQualities = await calculateTrackQualities(theirIdString);
            const yourTrackQualities = await calculateTrackQualities(yourIdString);
            const themeSong = await fetchThemeSong(theirProfile.theme_song_id);
            const favoriteLyrics = await fetchFavoriteLyrics(profiles[0].id);
            const profileInfo =
            {

                name: theirProfile.first_name,
                image: theirProfile.photo,
                percentMatch: await calculatePercentMatch(theirTrackQualities, yourTrackQualities),
                trackList: await theirPlaylist,
                themeSongImage: themeSong.album.images[0].url,
                title: themeSong.name,
                artist: themeSong.artists[0].name,
                lyrics: favoriteLyrics.lyrics,
                favoriteLyric: favoriteLyrics.favorite_lyric,
                favoriteLyricTitle: favoriteLyrics.song_title,
                favoriteLyricArtist: favoriteLyrics.song_artist,
                musicDiff: await calculateMusicDiff(theirTrackQualities, yourTrackQualities),
                yourTrackQualities: await yourTrackQualities,
            }


            setSlides(profileInfo);
            setIsLoading(false);
        } catch (error) {
            checkProfilesEmpty();
            console.error(error.message);
        }
    }

    //Populates profiles array
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
        toast.success('You got a match!');
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
            setProfiles(tempArray)
            setIsLoading(true);
            fetchData();
        } catch (error) {
            console.error(error.message);
        }
    }

    const checkProfilesEmpty = () => {
        if (profiles) {
            if (profiles.length == 0) {
                setIsEmpty(true);
            }
        }
    }

    const emptyProfilesArray = () => {
        setProfiles();
        setHasError(false);
        setIsEmpty(false);
    }

    //Handles when a user guesses another user's favorite lyric
    const handleSendingGuess = async (index) => {
        console.log('guess: ' + index)
        try {
            const body = {
                swiped: 'right',
                user_account_id: await fetchUserId(),
                other_user_account_id: profiles[0].id,
                guess: index
            }
            const response = await fetch(`${restAPIUrl.url}/swipes`, {
                method: 'POST',
                headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const tempArray = profiles;
            const parseRes = await response.json();
            console.log(parseRes)
            if (parseRes.match === true) {
                matchNotification();
            }
            tempArray.shift();
            setProfiles(tempArray)
            setIsLoading(true);
            fetchData();
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [profiles])


    const profileSection =
        <Fragment>
            <div className="profileSection">
                <div className='entireProfile glass'>
                    {
                        isLoading ? <LoadingMatchDashboard /> : <Profile profileInfo={slides}
                            key='1'
                            handleSendingGuess={handleSendingGuess}
                            handlePlaySample={handlePlaySample} />
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
                        lyrics={[]} /> : ''
                }
                {
                    isEmpty ? <Popup isEmpty={isEmpty}
                        emptyProfilesArray={emptyProfilesArray}
                        isSeen={true}
                        lyrics={[]} /> : ''
                }
            </div>
        </Fragment>
    )
}