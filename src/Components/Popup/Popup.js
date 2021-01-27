import React, { useState, Fragment, useEffect } from 'react';
import './Popup.css';
import { TrackList } from '../FavoriteLyric/TrackList/TrackList';
import {Lyric} from '../FavoriteLyric/Lyric/Lyric';
import x from '../../images/x.png'

export function Popup(props) {

    const handleFetchLyrics = () => {
        props.fetchLyrics();
    }

    const handleSelectedLines = () => {

    }

    if (props.isSeen) {
        if(props.lyrics.length > 0){
            return (
                <div className='popup flexCenterColumn'>
                    <div className='glass window'>
                        <img onClick={props.handleXClick} className='x' src={x}/>
                        <Lyric lyrics={props.lyrics}
                            handleLineSelect={props.handleLineSelect} 
                            selectedLines={props.selectedLines}/> 
                        {
                            props.selectedLines ? <button className='button' onClick={handleSelectedLines}>these are my favorites lines</button> : ''
                        }
                    </div>
                </div>
            )
        }
        else if (props.tracks) {
            return (
                <div className='popup flexCenterColumn'>
                    <div className='glass window'>
                        <img onClick={props.handleXClick} className='x' src={x}/>
                        {
                            props.tracks ? <TrackList tracks={props.tracks}
                                handleTrackClick={props.handleTrackClick}
                                handleLineSelect={props.handleLineSelect} /> : ''
                        }
                        {
                            props.selectedTrack ? <button className='button' onClick={handleFetchLyrics}>find lyrics</button> : ''
                        }
                    </div>
                </div>
            )
        }

    }

    return(
        <Fragment>

        </Fragment>
    )

}