import React, {Fragment, useState, useEffect} from 'react';
import {Playlist} from '../Playlist/Playlist'
import './YourPlaylist.css';

export function YourPlaylist(){

    const [playlists, setPlaylists] = useState();

    const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:4000/login/loadPlaylists', {
            method: 'GET',
            headers: { token: sessionStorage.token }
        })
        const parseRes = await response.json();
        console.log(parseRes);
        const playlists = parseRes.items.map(playlist => ({
            id: playlist.id,
            owner: playlist.owner.display_name,
            name: playlist.name
        }))
        setPlaylists(playlists);
    }

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <Fragment>
            <p>your playlist</p>
            {
                playlists.map(playlist => {
                    return <Playlist playlist={playlist}
                        key={playlist.id}/>
                })
            }
        </Fragment>
    )
}