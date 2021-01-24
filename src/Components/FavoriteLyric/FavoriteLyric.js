import React, { useState, Fragment, useEffect } from 'react';
import './FavoriteLyric.css';
import { TrackList } from './TrackList/TrackList';
import { LyricTrack } from './LyricTrack/LyricTrack';
import { Lyric } from './Lyric/Lyric';
import { MyFavoriteLyrics } from './MyFavoriteLyrics/MyFavoriteLyrics';

export function FavoriteLyric() {

    const [input, setInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState();
    const [trackInfo, setTrackInfo] = useState([]);
    const [lyrics, setLyrics] = useState([]);
    const [selectedLine, setSelectedLine] = useState();
    const [selectedLines, setSelectedLines] = useState([]);
    const [favoriteLyric, setFavoriteLyric] = useState();
    const [favoriteLyricFromDatabase, setFavoriteLyricFromDatabase] = useState();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`http://localhost:4000/lyrics/track/${selectedTrack}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes.lyrics_body)
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
            const response = await fetch(`http://localhost:4000/lyrics/search/${input}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            setTracks(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleLyricsSubmission = () => {

    }

    const handleFavoriteSubmission = async () => {
        try {
            /*
            const body = {
                trackInfo, favoriteLyric, selectedLines
            };*/

            const body = {
                song_artist: trackInfo[0],
                song_title: trackInfo[1],
                favorite_lyric: favoriteLyric,
                line_one: selectedLines[0],
                line_two: selectedLines[1],
                line_three: selectedLines[2],
                line_four: selectedLines[3],
                line_five: selectedLines[4],
            };
            const print = JSON.stringify(body);
            //console.log(print)
            if (!favoriteLyricFromDatabase) {
                const response = await fetch(`http://localhost:4000/lyrics/save-favorite-lyric`, {
                    method: 'POST',
                    headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                console.log(parseRes);
            }
            else {
                const response = await fetch(`http://localhost:4000/lyrics/edit-favorite-lyric`, {
                    method: 'PUT',
                    headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                console.log(parseRes);
            }
            fetchFavoriteLyric();
        } catch (error) {
            console.error(error.message);
        }
    }

    const fetchFavoriteLyric = async () => {
        try {
            const response = await fetch(`http://localhost:4000/lyrics/favorite`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            if (parseRes && !favoriteLyricFromDatabase) {
                setFavoriteLyricFromDatabase(parseRes)
            }
            else if (favoriteLyricFromDatabase.song_artist !== parseRes.song_artist || favoriteLyricFromDatabase.song_title !== parseRes.song_title) {
                setFavoriteLyricFromDatabase(parseRes)
                console.log('sup')
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchFavoriteLyric();
        if (selectedLine || selectedLine == 0) {
            const lines = [];
            for (let i = selectedLine; i < selectedLine + 5 || i < (selectedLine + 4); i++) {
                lines.push(lyrics[i]);
            }
            setSelectedLines(lines);
        }
    }, [selectedLine, favoriteLyricFromDatabase])

    return (
        <Fragment>
            <div className='editProfileSettings'>
                <p>your favorite lyrics</p>
                {
                    favoriteLyricFromDatabase ? <MyFavoriteLyrics lyrics={favoriteLyricFromDatabase} /> : ''
                }
                <p>find some lyrics</p>

                <form onSubmit={search}>
                    <input type="text" name="search" placeholder="type a song name" onChange={handleChange} value={input}></input>
                    <button className='button'>search</button>
                </form>
                {
                    tracks.length > 0 ? <TrackList tracks={tracks}
                        handleTrackClick={handleTrackClick}
                        handleLineSelect={handleLineSelect} /> : ''
                }
                {
                    selectedTrack ? <button className='button' onClick={fetchLyrics}>find lyrics</button> : ''
                }
                {
                    lyrics ? <Lyric lyrics={lyrics}
                        handleLineSelect={handleLineSelect} /> : ''
                }
                {
                    selectedLines ? <Lyric lyrics={selectedLines}
                        handleFavoriteLyricSelect={handleFavoriteLyricSelect} /> : ''
                }
                {
                    favoriteLyric ? <button className='button' onClick={handleFavoriteSubmission}>submit favorite lyric</button> : ''
                }
            </div>
        </Fragment>
    )
}