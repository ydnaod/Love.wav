import React, { useState, Fragment, useImperativeHandle, useEffect } from 'react';
import './YourThemeSong.css';
import { Track } from '../Slides/Track/Track'

export function YourThemeSong({ fetchUserId }) {

    const [input, setInput] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedThemeSong, setSelectedThemeSong] = useState();
    const [currentThemeSong, setCurrentThemeSong] = useState();

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
                headers: { token: sessionStorage.token }
            })
            const parseRes = await response.json();
            //console.log(parseRes);
            fetchThemeSong();
        } catch (error) {
            console.error(error.message);
        }
    }

    const fetchThemeSong = async () => {
        try {
            const userId = await fetchUserId();
            const response = await fetch(`http://localhost:4000/profile/${userId}/theme-song/`, {
                method: 'GET',
                json: true,
                headers: { token: sessionStorage.token }
            })
            const parseRes = await response.json();
            const responseTwo = await fetch(`http://localhost:4000/login/theme_song/${parseRes.theme_song_id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseTwo = await responseTwo.json();
            const track = {
                name: parseTwo.name,
                album: parseTwo.album.name,
                artist: parseTwo.artists[0].name,
                id: parseTwo.id,
                preview_url: parseTwo.preview_url
            }
            setCurrentThemeSong(track);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchThemeSong();
    }, []);

    return (
        <Fragment>
            <div className='editProfileSetting editThemeSong'>
                <div className='currentThemeSong'>
                    <h3>your theme song</h3>
                    {
                        currentThemeSong ? <Track track={currentThemeSong} /> : <p className='loading-gradient'>Loading</p>
                    }
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <input className='input' type='text' name='search' value={input} placeholder="search for a song" onChange={handleChange} />
                    <button id='searchButton' className='button'>Search</button>
                </form>
                <div className='trackListThemeSong'>
                    {
                        tracks.map(track => {
                            return <Track track={track}
                                key={track.id}
                                handleSelectedThemeSong={handleSelectedThemeSong}
                                isSelected={selectedThemeSong == track.id ? true : false}
                            />
                        })
                    }
                    {
                        selectedThemeSong ? <button id='submitThemeSong'className='button' onClick={handleThemeSongSubmit}>make this my theme song</button> : ''
                    }
                </div>
            </div>
        </Fragment>
    )
}