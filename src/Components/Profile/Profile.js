import React, { useState, useEffect, Fragment } from 'react';
import './Profile.css';

export function Profile(props) {
    return (
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
    )
}