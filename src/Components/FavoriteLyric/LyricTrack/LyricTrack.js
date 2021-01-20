import React, { useState, Fragment } from 'react';
import './LyricTrack.css';

export function LyricTrack({ track, key, artist_name, album_name, track_name, has_lyrics, handleTrackClick }) {

    const handleClick = () => {
        handleTrackClick(track.track.track_id);
    }

    return (
        <Fragment>
            <div className="track" onClick={handleClick}>
                <p><span className="title">{track_name}</span> | {artist_name} | {album_name}</p>
            </div>
        </Fragment>
    )
}