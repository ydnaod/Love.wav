import React, {Fragment, useEffect, useState} from 'react';
import './EditProfile.css';

export function EditProfile(){

    const [playlists, setPlaylists] = useState();

    const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:4000/login/loadPlaylists', {
            method: 'GET',
            headers: {token: sessionStorage.token}
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

    return(
        <Fragment>
            <p>EditPRofile page</p>
            {
                
            }
        </Fragment>
    )
}