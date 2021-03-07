import React, { useState, Fragment } from 'react';
import './Track.css';
import playSampleButton from '../../../images/playSampleButton.png'
const style = require('../../../Util/selectedStyling')

export function Track(props) {

    const handleClick = () => {
        props.handlePlaySample(props.track.preview_url);
        //setInterval(() => {this.setState({isPlaying: false})}, 30000)
        //setState({isPlaying: true})
    }

    const handleSelectSong = () => {
        if (props.handleSelectedThemeSong) {
            props.handleSelectedThemeSong(props.track.id);
        }
    }

    return (
        <Fragment>
            <div className="trackList">
                <div style={props.isSelected ? style.selected : style.defaultStyle} className="track" onClick={handleSelectSong}>
                    <img className="sampleButton" src={playSampleButton} onClick={handleClick} />
                    <p className='songText'>{props.track.playlistIndex || props.track.playlistIndex == 0 ? props.track.playlistIndex + 1 + ". " : ""}<span className="title">{props.track.name}</span> | {props.track.artist} | {props.track.album}</p>
                </div>
            </div>
        </Fragment>
    )
}