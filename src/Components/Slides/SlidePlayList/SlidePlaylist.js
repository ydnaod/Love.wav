import React, { useState, useEffect, Fragment } from 'react';
import './SlidePlaylist.css';
import { Track } from '../Track/Track';

export function SlidePlaylist(props) {


    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>their playlist</h2>
                </div>
                <div className="playlistSlide">
                    <div className="tracks">
                        {
                            props.profileInfo.trackList.map(track => {

                                return (

                                    <Track track={track}
                                        key={track.id} />

                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}