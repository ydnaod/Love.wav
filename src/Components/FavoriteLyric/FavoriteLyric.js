import React, { useState, Fragment, useEffect } from 'react';
import './FavoriteLyric.css';
import { MyFavoriteLyrics } from './MyFavoriteLyrics/MyFavoriteLyrics';
import { Popup } from '../Popup/Popup'
const restAPIUrl = require('../../Util/serverUrl');

export function FavoriteLyric({fetchUserId}) {

    //Used with input field to search for songs
    const [input, setInput] = useState('');

    //Array of tracks returned from the song search
    const [tracks, setTracks] = useState([]);

    //Keeps track of which track is selected
    const [selectedTrack, setSelectedTrack] = useState();

    //Holds artist and song title once the lyrics are chosen
    const [trackInfo, setTrackInfo] = useState([]);

    //Renders lyrics to be selected
    const [lyrics, setLyrics] = useState([]);

    //Holds the initial first five lines
    const [selectedLines, setSelectedLines] = useState({});

    //Holds the absolute favorite line selected from the already selected 5 lines. This will represent the correct guess
    const [selectedLine, setSelectedLine] = useState();

    //Fetched from the database once a favorite line is selected
    const [favoriteLyric, setFavoriteLyric] = useState();

    //Used to determine if there is already an entry in the database. So we know whether or not POST or PUT
    const [favoriteLyricFromDatabase, setFavoriteLyricFromDatabase] = useState();

    //Set to true after user searches for a song
    const [popupSeen, setPopupSeen] = useState(false);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    //Closes the popup window and clears relevant state variables
    const handleXClick = () => {
        setInput('');
        setTracks([]);
        setSelectedTrack();
        setLyrics([]);
        setSelectedLine();
        setSelectedLines({});
        setFavoriteLyric();
        setPopupSeen(false);
    }

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`${restAPIUrl.url}/lyrics/track/${selectedTrack}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            const array = parseRes.lyrics_body.split('\n')
            array.splice(array.length - 4, 4);
            setLyrics(array)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleTrackClick = (trackId, artist, name) => {
        setSelectedTrack(trackId);
        const songInfo = [];
        songInfo.push(artist);
        songInfo.push(name);
        setTrackInfo(songInfo);
    }

    const handleLineSelect = (index) => {
        setSelectedLine(index);
    }

    const handleFavoriteLyricSelect = (index) => {
        setFavoriteLyric(index);
    }

    const search = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${restAPIUrl.url}/lyrics/search/${input}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            setTracks(parseRes);
            setPopupSeen(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    //Called when the user submits their favorite lyric
    const handleFavoriteSubmission = async () => {
        try {
            let tempArray = [];
            for (const line in selectedLines) {
                tempArray.push(selectedLines[line]);
            }
            console.log(tempArray)
            const body = {
                song_artist: trackInfo[0],
                song_title: trackInfo[1],
                favorite_lyric: favoriteLyric,
                line_one: tempArray[0],
                line_two: tempArray[1],
                line_three: tempArray[2],
                line_four: tempArray[3],
                line_five: tempArray[4],
            };
            if (!favoriteLyricFromDatabase) {
                const response = await fetch(`${restAPIUrl.url}/lyrics/save-favorite-lyric`, {
                    method: 'POST',
                    headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                console.log(parseRes);
            }
            else {
                const response = await fetch(`${restAPIUrl.url}/lyrics/edit-favorite-lyric`, {
                    method: 'PUT',
                    headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                console.log(parseRes);
            }
            setPopupSeen(false);
            fetchFavoriteLyric();
            setInput('');
            setTracks([]);
            setSelectedTrack();
            setLyrics([]);
            setSelectedLine();
            setSelectedLines({});
            setFavoriteLyric();
        } catch (error) {
            console.error(error.message);
        }
    }

    //Fetches the user's favorite lyric from database if it exists
    const fetchFavoriteLyric = async () => {
        try {
            const id = await fetchUserId();
            const response = await fetch(`${restAPIUrl.url}/lyrics/${id}/favorite`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            if (parseRes && !favoriteLyricFromDatabase) {
                setFavoriteLyricFromDatabase(parseRes)
            }
            else if (favoriteLyricFromDatabase.song_artist !== parseRes.song_artist || favoriteLyricFromDatabase.song_title !== parseRes.song_title || favoriteLyricFromDatabase.line_one !== parseRes.line_one || favoriteLyricFromDatabase.favorite_lyric !== parseRes.favorite_lyric) {
                setFavoriteLyricFromDatabase(parseRes)
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchFavoriteLyric();
        if (selectedLine || selectedLine == 0) {
            const lines = {};
            let maxLines = 5;
            for (let i = selectedLine; i < selectedLine + maxLines || i < (selectedLine + 4); i++) {
                if (lyrics[i]) {
                    lines[i] = lyrics[i];
                }
                else if (lyrics[i] === "") {
                    maxLines++;
                }
            }
            setSelectedLines(lines);
        }
    }, [selectedLine, favoriteLyricFromDatabase])

    const loadingDiv = 
    <Fragment>
        <p className='loading-gradient'>loading</p>
        <p className='loading-gradient'>loading</p>
        <p className='loading-gradient'>loading</p>
        <p className='loading-gradient'>loading</p>
        <p className='loading-gradient'>loading</p>
        <p className='loading-gradient'>loading</p>
    </Fragment>

    return (
        <Fragment>
            <div className='editProfileSetting flexCenterColumn editFavoriteLyrics'>
                <div className='currentFavorite'>
                    <h3>your favorite lyrics</h3>
                    {
                        favoriteLyricFromDatabase ? <MyFavoriteLyrics lyrics={favoriteLyricFromDatabase} /> : loadingDiv
                    }
                </div>
                <div className='lyricSearch'>
                    <h3>find some lyrics</h3>
                    <form className='form' onSubmit={search}>
                        <input type="text" name="search" placeholder="type a song name" onChange={handleChange} value={input}></input>
                        <button id='searchButton' className='button'>search</button>
                    </form>
                    {
                        tracks.length > 0 ? <Popup tracks={tracks}
                            handleTrackClick={handleTrackClick}
                            handleLineSelect={handleLineSelect}
                            isSeen={popupSeen}
                            handleXClick={handleXClick}
                            selectedTrack={selectedTrack}
                            fetchLyrics={fetchLyrics}
                            lyrics={lyrics}
                            handleLineSelect={handleLineSelect}
                            selectedLines={selectedLines}
                            handleFavoriteLyricSelect={handleFavoriteLyricSelect}
                            favoriteLyric={favoriteLyric}
                            handleFavoriteSubmission={handleFavoriteSubmission} /> : ''
                    }
                </div>
            </div>
        </Fragment>
    )
}