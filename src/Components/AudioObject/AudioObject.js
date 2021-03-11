import React, {useState, Fragment, useEffect, useRef} from 'react';

export function AudioObject({isPlayingSample}) {

    //const [song, setSong] = useState()
    const song = useRef(new Audio(isPlayingSample));

    useEffect(() => {

        //let audioObject;
        if (isPlayingSample !== false) {
            const audioObject = new Audio(isPlayingSample);
            // setSong(audioObject);

           //setInterval(() => {this.setState({isPlaying: false})}, 30000)

           console.log(song);
           console.log(audioObject);
           song.current.play();
           //setTimeout(() => {song.play();}, 10000);
           //setIsPlayingSample(isPlayingSample);
           }
        else if (isPlayingSample) {
            song.current.pause();
        }
        else {
            song.current.pause();
            //setIsPlayingSample(false);
        }
    },[isPlayingSample])

    return (
        <Fragment>

        </Fragment>
    )
}