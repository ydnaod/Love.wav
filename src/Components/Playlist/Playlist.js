import React, {useState, Fragment} from 'react';
import './Playlist.css';

export function Playlist({playlist}){
    return(
        <Fragment>
            <p>{playlist.name}</p>
            <p>{playlist.owner}</p>
        </Fragment>
    )
}