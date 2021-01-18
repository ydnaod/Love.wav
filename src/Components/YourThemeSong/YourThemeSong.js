import React, { useState, Fragment, useImperativeHandle } from 'react';
import './YourThemeSong.css';
import {Track} from '../Slides/Track/Track'

export function YourThemeSong({fetchUserId}) {

    const [input, setInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedThemeSong, setSelectedThemeSong] = useState();

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/login/search-tracks/${input}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            })

            const parseRes = await response.json();
            const trackList = parseRes.items.map(track => ({
                name: track.name,
                album: track.album.name,
                artist: track.artists[0].name,
                id: track.id,
                preview_url: track.preview_url
            }))
            setTracks(trackList);
            /*return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url
            }))*/
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleSelectedThemeSong = async (trackId) => {
        setSelectedThemeSong(trackId);
    }

    const handleThemeSongSubmit = async () => {
        try {
            const userId = await fetchUserId();
            const response = await fetch(`http://localhost:4000/profile/${userId}/theme-song/${selectedThemeSong}`, {
                method: 'PUT',
                json: true,
                headers: {token:sessionStorage.token}
            })
            const parseRes = await response.json();
            //console.log(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <p>your theme song</p>
            <form onSubmit={handleSubmit}>
                <input type='text' name='search' value={input} placeholder="search for a song" onChange={handleChange}/>
                <button>Search</button>
            </form>
            {
                tracks.map(track => {
                    return <Track track={track}
                        key={track.id}
                        handleSelectedThemeSong={handleSelectedThemeSong}
                        />
                })
            }
            <button onClick={handleThemeSongSubmit}>make this my theme song</button>
        </Fragment>
    )
}