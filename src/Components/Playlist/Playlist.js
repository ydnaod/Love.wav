import React, { useState, Fragment } from 'react';
import './Playlist.css';

export function Playlist({ playlist, fetchUserId, fetchCurrentPlaylist }) {


    const handleClick = async (e) => {

        const id = await fetchUserId();
        const playlistId = await playlist.id;
        const body = { playlistId };
        //console.log(playlistId);
        console.log(body);
        const response = await fetch(`http://localhost:4000/profile/${id}/playlist`, {
            method: 'PUT',
            headers: { token: sessionStorage.token, "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        fetchCurrentPlaylist();
        //console.log(parseRes);
    }

    return (
        <Fragment>
            <div>
                <div className='playlist' onClick={handleClick}>
                    <p>{playlist.name} | {playlist.owner}</p>
                </div>
            </div>
        </Fragment>
    )
}