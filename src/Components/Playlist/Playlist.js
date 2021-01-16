import React, { useState, Fragment } from 'react';
import './Playlist.css';

export function Playlist({ playlist }) {

    const handleClick = async (e) => {
        const response = await fetch('http://localhost:4000/')
    }

    return (
        <Fragment>
            <div className='playlist' onClick={handleClick}>
                <p>{playlist.name}</p>
                <p>{playlist.owner}</p>
            </div>
        </Fragment>
    )
}