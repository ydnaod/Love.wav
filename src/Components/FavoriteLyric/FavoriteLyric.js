import React, { useState, Fragment } from 'react';
import './FavoriteLyric.css';
import { TrackList } from './TrackList/TrackList';
import { LyricTrack } from './LyricTrack/LyricTrack';
import { Lyric } from './Lyric/Lyric';

export function FavoriteLyric() {

    const [input, setInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState([]);
    const [lyrics, setLyrics] = useState();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`http://localhost:4000/lyrics/${selectedTrack[0]}/${selectedTrack[1]}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes)
            const array = await parseRes.split('\n')
            setLyrics(array)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleTrackClick = (artist, title) => {
        setSelectedTrack([artist, title]);
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

    return (
        <Fragment>
            <p>Favorite lyric</p>

            <form onSubmit={search}>
                <input type="text" name="search" placeholder="type a song name" onChange={handleChange} value={input}></input>
                <button>search</button>
            </form>
            {
                tracks.length > 0 ? <TrackList tracks={tracks}
                    handleTrackClick={handleTrackClick} /> : ''
            }
            {
                selectedTrack ? <button onClick={fetchLyrics}>find lyrics</button> : ''
            }
            {
                lyrics ? <Lyric lyrics={lyrics} /> : ''
            }
        </Fragment>
    )
}