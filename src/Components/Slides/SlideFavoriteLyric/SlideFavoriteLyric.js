import React, { useState, useEffect, Fragment } from 'react';
import './SlideFavoriteLyric.css';
import {Track} from '../Track/Track'

export function SlideFavoriteLyric(props) {

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{props.profileInfo.slideTitle}</h2>
                </div>
                <div className="lyricSlide">
                    <div className="lyrics">
                        <Track track={props.profileInfo}/>
                        {
                            props.profileInfo.lyrics.map(lyric => {

                                return (
                                    <p className="lyric">{lyric}</p>
                                )

                            })
                        }
                    </div>
                    <img className="lyricImage" src={props.profileInfo.image}/>
                </div>
            </div>
        </Fragment>
    )
}