import React, { useState, Fragment } from 'react';
import './Playlist.css';
const style = require('../../Util/selectedStyling')
const restAPIUrl = require('../../Util/serverUrl');

export function Playlist({ playlist, fetchUserId, fetchCurrentPlaylist, handleSelectedPlaylist, isSelected }) {


    const handleClick = async (e) => {

        const id = await fetchUserId();
        const playlistId = await playlist.id;
        const body = { playlistId };
        //console.log(playlistId);
        console.log(body);
        const response = await fetch(`${restAPIUrl.url}/profile/${id}/playlist`, {
            method: 'PUT',
            headers: { token: sessionStorage.token, "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        fetchCurrentPlaylist();
        handleSelectedPlaylist(playlistId);
        //console.log(parseRes);
    }

    return (
        <Fragment>
            <div>
                <div style={isSelected ? style.selected : style.defaultStyle} className='playlist' onClick={handleClick}>
                    <p>{playlist.name}</p>
                </div>
            </div>
        </Fragment>
    )
}