import React, { useState, Fragment, useEffect } from 'react';
import './FavoriteLyric.css';
import { TrackList } from './TrackList/TrackList';
import { LyricTrack } from './LyricTrack/LyricTrack';
import { Lyric } from './Lyric/Lyric';
import { MyFavoriteLyrics } from './MyFavoriteLyrics/MyFavoriteLyrics';
import { Popup } from '../Popup/Popup'

export function FavoriteLyric() {

    const [input, setInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState();
    const [trackInfo, setTrackInfo] = useState([]);
    const [lyrics, setLyrics] = useState([]);
    const [selectedLine, setSelectedLine] = useState();
    const [selectedLines, setSelectedLines] = useState({});
    const [favoriteLyric, setFavoriteLyric] = useState();
    const [favoriteLyricFromDatabase, setFavoriteLyricFromDatabase] = useState();
    const [popupSeen, setPopupSeen] = useState(false);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleXClick = () => {
        setPopupSeen(false);
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
            setPopupSeen(true);
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
            let tempArray = [];
            for(const line in selectedLines){
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
            setPopupSeen(false);
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
            const lines = {};
            let maxLines = 5;
            for (let i = selectedLine; i < selectedLine + maxLines || i < (selectedLine + 4); i++) {
                if (lyrics[i]) {
                    lines[i] = lyrics[i];
                }
                else if(lyrics[i] === ""){
                    maxLines ++;
                }
            }
            setSelectedLines(lines);
        }
    }, [selectedLine, favoriteLyricFromDatabase])

    return (
        <Fragment>
            <div className='editProfileSetting flexCenterColumn editFavoriteLyrics'>
                <div className='currentFavorite'>
                    <h3>your favorite lyrics</h3>
                    {
                        favoriteLyricFromDatabase ? <MyFavoriteLyrics lyrics={favoriteLyricFromDatabase} /> : ''
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
                            handleFavoriteSubmission={handleFavoriteSubmission}/> : ''
                    }
                    {
                        //lyrics ? <Lyric lyrics={lyrics}
                        // handleLineSelect={handleLineSelect} /> : ''
                    }
                    {
                        //selectedLines ? <Lyric lyrics={selectedLines}
                        // handleFavoriteLyricSelect={handleFavoriteLyricSelect} /> : ''
                    }
                    {
                        //favoriteLyric ? <button className='button' onClick={handleFavoriteSubmission}>submit favorite lyric</button> : ''
                    }
                </div>
            </div>
        </Fragment>
    )
}