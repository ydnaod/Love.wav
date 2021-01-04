import React, { useState, useEffect, Fragment } from 'react';
import './Profile.css';
import { SlidePlaylist } from '../Slides/SlidePlayList/SlidePlaylist'
import { SlideThemeSong } from '../Slides/SlideThemeSong/SlideThemeSong';
import { SlideFavoriteLyric } from '../Slides/SlideFavoriteLyric/SlideFavoriteLyric';
import { SlidePercentMatch } from '../Slides/SlidePercentMatch/SlidePercentMatch';

export function Profile(props) {

    if (props.profileInfo.id == 0) {
        return <SlideThemeSong profileInfo={props.profileInfo} />
    }
    if (props.profileInfo.id == 1) {
        return <SlidePlaylist profileInfo={props.profileInfo} />
    }
    if (props.profileInfo.id == 2) {
        return <SlideFavoriteLyric profileInfo={props.profileInfo} />
    }
    if (props.profileInfo.id == 3) {
        return <SlidePercentMatch profileInfo={props.profileInfo} />
    }

    /*return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{props.profileInfo.slideTitle}</h2>
                </div>
                <div className="songDetailsSlide">
                    <img className="albumCover" src={props.profileInfo.image} />
                    <div className="songDetails">
                        <h3>{props.profileInfo.title}</h3>
                        <h3>{props.profileInfo.artist}</h3>
                    </div>
                </div>
            </div>
        </Fragment>
    )*/
}