import React, { useState, useEffect, Fragment } from 'react';
import './SlideThemeSong.css';

export function SlideThemeSong(props) {

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>theme song</h2>
                </div>
                <div className="songDetailsSlide">
                    <img className="albumCover" src={props.profileInfo.themeSongImage} />
                    <div className="songDetails">
                        <h3>{props.profileInfo.title}</h3>
                        <h3>{props.profileInfo.artist}</h3>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}