import React, { useState, useEffect, Fragment } from 'react';
import './SlidePlaylist.css';

export function SlidePlaylist(props) {

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{props.profileInfo.slideTitle}</h2>
                </div>
                <div className="songDetailsSlide">
                    <div className="songDetails">
                        {
                            props.profileInfo.trackList.map(track => {
                                return (
                                    <div>
                                        <h3>{track.title}</h3>
                                        <h3>{track.artist}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}