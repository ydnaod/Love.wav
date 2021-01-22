import React, {Fragment, useState, useEffect} from 'react';
import {Playlist} from '../Playlist/Playlist'
import './YourPlaylist.css';

export function YourPlaylist({fetchUserId}){

    const [playlists, setPlaylists] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPlaylist, setCurrentPlaylist] = useState();

    const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:4000/login/loadPlaylists', {
            method: 'GET',
            headers: { token: sessionStorage.token }
        })
        const parseRes = await response.json();
        //console.log(parseRes);
        const playlists = parseRes.items.map(playlist => ({
            id: playlist.id,
            owner: playlist.owner.display_name,
            name: playlist.name
        }))
        setPlaylists(playlists);
        setIsLoading(false);
    }

    const fetchCurrentPlaylist = async () => {
        try {
            const id = await fetchUserId();
            const response = await fetch(`http://localhost:4000/profile/${id}/playlist`, {
                method: 'GET',
                headers: {token: sessionStorage.token}
            });
            const parseRes = await response.json();
            console.log(parseRes);
            const responseTwo = await fetch(`http://localhost:4000/login/load-playlist/${parseRes.playlist_id}`, {
                method: 'GET',
                headers: {token: sessionStorage.token}
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

    return (
        <Fragment>
            <p>your current playlist</p>
            {
                currentPlaylist ? <Playlist playlist={currentPlaylist}/> : ''
            }
            <p>your other playlists</p>
            {
                isLoading ? <p>isLoading</p> : playlists.map(playlist => {
                    return <Playlist playlist={playlist}
                        key={playlist.id}
                        fetchUserId={fetchUserId}
                        fetchCurrentPlaylist={fetchCurrentPlaylist}/>
                })
            }
        </Fragment>
    )
}