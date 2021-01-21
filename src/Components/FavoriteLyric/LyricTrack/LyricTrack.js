import React, { useState, Fragment } from 'react';
import './LyricTrack.css';

export function LyricTrack({ track, artist, album, title, handleTrackClick }) {

    const handleClick = () => {
        handleTrackClick(artist, title);
    }

    return (
        <Fragment>
            <div className="track" onClick={handleClick}>
                <p><span className="title">{title}</span> | {artist} | {album}</p>
            </div>
        </Fragment>
    )
}