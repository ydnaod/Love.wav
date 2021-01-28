import React, { useState, Fragment } from 'react';
import './LyricTrack.css';
const style = require('../../../Util/selectedStyling')

export function LyricTrack({ track, artist_name, album_name, track_name, has_lyrics, handleTrackClick, isSelected }) {

    const handleClick = () => {
        handleTrackClick(track.track.track_id, artist_name, track_name);
    }

    return (
        <Fragment>
            <div className="track" onClick={handleClick}>
                <p style={isSelected ? style.selected : style.defaultStyle}><span className="title">{track_name}</span> | {artist_name} | {album_name}</p>
            </div>
        </Fragment>
    )
}