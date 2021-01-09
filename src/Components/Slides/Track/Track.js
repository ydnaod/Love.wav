import React, { useState, Fragment } from 'react';
import './Track.css';
import playSampleButton from '../../../images/playSampleButton.png'

export function Track(props) {

    const handlePlaySample = () => {
        const audioObject = new Audio(props.track.preview_url);
        //setInterval(() => {this.setState({isPlaying: false})}, 30000)
      audioObject.play();
      //setState({isPlaying: true})
    }

    return (
        <Fragment>
            <div className="trackList">
                <div className="track">
                    <img className="sampleButton" src={playSampleButton} onClick={handlePlaySample}/>
                    <p>{props.track.playlistIndex || props.track.playlistIndex == 0 ? props.track.playlistIndex + 1 + ". "  : ""}<span className="title">{props.track.name}</span> | {props.track.artist} | {props.track.album}</p>
                </div>
            </div>
        </Fragment>
    )
}