import React, { Fragment, useState, useEffect } from 'react';
import { Playlist } from '../Playlist/Playlist'
import './YourPlaylist.css';
const restAPIUrl = require('../../Util/serverUrl')

export function YourPlaylist({ fetchUserId }) {

    const [playlists, setPlaylists] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const [selectedPlaylist, setSelectedPlaylist] = useState();

    const fetchPlaylists = async () => {
        const response = await fetch(`${restAPIUrl.url}/login/loadPlaylists`, {
            method: 'GET',
            headers: { token: sessionStorage.token }
        })
        const parseRes = await response.json();
        let playlists;
        if (parseRes.items) {
            if (parseRes.items.length > 0) {
                playlists = parseRes.items.map(playlist => ({
                    id: playlist.id,
                    owner: playlist.owner.display_name,
                    name: playlist.name
                }))
                setPlaylists(playlists);
                setIsLoading(false);
            }
        }
        else {
            console.log(parseRes);
        }
    }

    const handleSelectedPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);
    }

    const fetchCurrentPlaylist = async () => {
        try {
            const id = await fetchUserId();
            const response = await fetch(`${restAPIUrl.url}/profile/${id}/playlist`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            const responseTwo = await fetch(`${restAPIUrl.url}/login/load-playlist/${parseRes.playlist_id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            })
            const parseTwo = await responseTwo.json();
            const playlist = {
                name: parseTwo.name,
                owner: parseTwo.owner.display_name,
                id: parseTwo.id
            }
            setCurrentPlaylist(playlist);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchPlaylists();
        fetchCurrentPlaylist();
    }, []);

    const loadingDiv =
        <Fragment>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
            <p className='loading-gradient'>Loading</p>
        </Fragment>

    return (
        <Fragment>
            <div className='editProfileSetting editYourPlaylist'>
                <div className='currentPlaylist'>
                    <h3>your current playlist</h3>
                    {
                        currentPlaylist ? <Playlist playlist={currentPlaylist} /> : <p className='loading-gradient'>Loading</p>
                    }
                    <h3>your other playlists</h3>
                </div>
                <div className='yourPlaylists'>
                    {
                        isLoading ? loadingDiv : playlists.map(playlist => {
                            return <Playlist playlist={playlist}
                                key={playlist.id}
                                fetchUserId={fetchUserId}
                                fetchCurrentPlaylist={fetchCurrentPlaylist}
                                handleSelectedPlaylist={handleSelectedPlaylist}
                                isSelected={selectedPlaylist == playlist.id ? true : false} />
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}