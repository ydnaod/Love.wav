import React, {useState, Fragment, useEffect, useRef} from 'react';

export function AudioObject({isPlayingSample, handleIsPlayingSample, isAlreadyPlayingSample}) {

    //const [song, setSong] = useState()
    const song = useRef(new Audio(isPlayingSample));

    const handleChangePlayingSample = (boolean) => {
        handleIsPlayingSample(boolean);
    }

    useEffect(() => {

        //let audioObject;
        if (isAlreadyPlayingSample !== true) {
            const audioObject = new Audio(isPlayingSample);
            // setSong(audioObject);

           //setInterval(() => {this.setState({isPlaying: false})}, 30000)

           console.log(song);
           console.log(audioObject);
           song.current.play();
           handleChangePlayingSample(true);
           //setTimeout(() => {song.play();}, 10000);
           //setIsPlayingSample(isPlayingSample);
           }
        else if (isPlayingSample) {
            song.current.pause();
            handleChangePlayingSample(false);
        }
        else {
            song.current.pause();
            handleChangePlayingSample(false);
            //setIsPlayingSample(false);
        }
    },[isPlayingSample])

    return (
        <Fragment>

        </Fragment>
    )
}