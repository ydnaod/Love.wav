import React, { useState, Fragment } from 'react';
import './Track.css';
import playSampleButton from '../../../images/playSampleButton.png'

export function Track(props) {
    return (
        <Fragment>
            <div className="trackList">
                <div className="track">
                    <img className="sampleButton" src={playSampleButton}/>
                    <p>{props.track.playlistIndex || props.track.playlistIndex == 0 ? props.track.playlistIndex + 1 + ". "  : ""}<span className="title">{props.track.title}</span> | {props.track.artist} | {props.track.album}</p>
                </div>
            </div>
        </Fragment>
    )
}