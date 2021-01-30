import React, { useState, useEffect, Fragment } from 'react';
import './SlideFavoriteLyric.css';
import { Track } from '../Track/Track'

export function SlideFavoriteLyric({profileInfo}) {

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{profileInfo.slideTitle}</h2>
                </div>
                <div className="lyricSlide">
                    <div className="lyrics">
                        <h3>{ profileInfo.title} | {profileInfo.artist }</h3>
                        {
                            profileInfo.lyrics.map(lyric => {

                                return (
                                    <p className="lyric" >{lyric}</p>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}