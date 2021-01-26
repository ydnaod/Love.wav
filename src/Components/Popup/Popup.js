import React, { useState, Fragment, useEffect } from 'react';
import './Popup.css';
import { TrackList } from '../FavoriteLyric/TrackList/TrackList'
import x from '../../images/x.png'

export function Popup(props) {

    if (props.isSeen) {
        if (props.tracks) {
            return (
                <div className='popup flexCenterColumn'>
                    <div className='glass window'>
                        <img onClick={props.handleXClick} className='x' src={x}/>
                        {
                            props.tracks ? <TrackList tracks={props.tracks}
                                handleTrackClick={props.handleTrackClick}
                                handleLineSelect={props.handleLineSelect} /> : ''
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