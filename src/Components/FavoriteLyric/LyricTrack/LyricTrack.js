import React, {useState, Fragment} from 'react';
import './LyricTrack.css';

export function LyricTrack({track, key, artist_name, album_name, track_name, has_lyrics}){
    return(
        <Fragment>
            <p>{track_name}</p>
            <p>{artist_name}</p>
            <p>{album_name}</p>
        </Fragment>
    )
}