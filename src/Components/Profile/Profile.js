import React, { useState, useEffect, Fragment } from 'react';
import './Profile.css';
import { SlidePlaylist } from '../Slides/SlidePlayList/SlidePlaylist'
import { SlideThemeSong } from '../Slides/SlideThemeSong/SlideThemeSong';
import { SlideFavoriteLyric } from '../Slides/SlideFavoriteLyric/SlideFavoriteLyric';
import { SlidePercentMatch } from '../Slides/SlidePercentMatch/SlidePercentMatch';
import { SlidePicture } from '../Slides/SlidePicture/SlidePicture';

export function Profile(props) {

    return (
        <Fragment>
                <SlidePicture profileInfo={props.profileInfo} />
                <SlideThemeSong profileInfo={props.profileInfo} />
                <SlidePlaylist profileInfo={props.profileInfo} />
                <SlideFavoriteLyric profileInfo={props.profileInfo}
                    handleSendingGuess={props.handleSendingGuess}/>
                <SlidePercentMatch profileInfo={props.profileInfo} />
        </Fragment>
    )
    // if (props.profileInfo.id == 0) {
    //     return <SlidePicture profileInfo={props.profileInfo} />
    // }
    // if (props.profileInfo.id == 2) {
    //     return <SlideThemeSong profileInfo={props.profileInfo} />
    // }
    // if (props.profileInfo.id == 1) {
    //     return <SlidePlaylist profileInfo={props.profileInfo} />
    // }
    // if (props.profileInfo.id == 3) {
    //     return <SlideFavoriteLyric profileInfo={props.profileInfo} />
    // }
    // if (props.profileInfo.id == 4) {
    //     return <SlidePercentMatch profileInfo={props.profileInfo} />
    // }

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