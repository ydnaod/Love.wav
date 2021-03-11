import React, {useState, Fragment, useEffect} from 'react';

export function AudioObject({isPlayingSample}) {

    const [song, setSong] = useState()

    useEffect(() => {

        let audioObject;
        if (isPlayingSample !== false) {
            audioObject = new Audio(isPlayingSample);
            setSong(audioObject);

           //setInterval(() => {this.setState({isPlaying: false})}, 30000)
           console.log(song);
           console.log(audioObject);
           song.play();
           //setTimeout(() => {song.play();}, 10000);
           //setIsPlayingSample(isPlayingSample);
           }
        else if (isPlayingSample) {
            audioObject.pause();
        }
        else {
            audioObject.pause();
            //setIsPlayingSample(false);
        }
    },[isPlayingSample])

    return (
        <Fragment>

        </Fragment>
    )
}