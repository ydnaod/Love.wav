import React,{Fragment} from 'react';
import './SlidePicture.css';


const { useState } = require("react")
export function SlidePicture(props){



    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{props.profileInfo.name}</h2>
                </div>
                <div className="pictureSlide">
                    <img className="profilePicture" src={props.profileInfo.image} />
                    <div id="percentMatch">
                        <h3>{props.profileInfo.percentMatch}</h3>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}