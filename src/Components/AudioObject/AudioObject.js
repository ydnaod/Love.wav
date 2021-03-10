import React, {useState, Fragment, useEffect} from 'react';

export function AudioObject({isPlayingSample}) {



    useEffect(() => {

        let audioObject;
        if (isPlayingSample) {
            audioObject = new Audio(isPlayingSample);
           //setInterval(() => {this.setState({isPlaying: false})}, 30000)
           audioObject.play();
           //setIsPlayingSample(isPlayingSample);
           }
           else {
             audioObject.pause();
             //setIsPlayingSample(false);
           }
    },[])

    return (
        <Fragment>

        </Fragment>
    )
}