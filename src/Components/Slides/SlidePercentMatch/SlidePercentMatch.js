import React, { useState, useEffect, Fragment } from 'react';
import './SlidePercentMatch.css';
import { Track } from '../Track/Track'

export function SlidePercentMatch({ profileInfo, profileInfo: { trackQualities } }) {

    //state variables to hold differences between profiles
    const [musicDiff, setMusicDiff] = useState(
        {
            acousticness: 1,
            danceability: 0,
            energy: 0,
            instrumentalness: 0,
            liveness: 0,
            valence: 0,
        }
    );
    
    //destructure the difference variables
    const { acousticness, danceability, energy, instrumentalness, liveness, valence } = musicDiff;

    //percentage match variable
    const [percentage, setPercentage] = useState("");

    //placeholder data
    const [yourMusic, setYourMusic] = useState({
        trackQualities: {
            acousticness: .7,
            danceability: .78,
            energy: .5,
            instrumentalness: .2,
            liveness: .3,
            valence: .7
        },
        tempo: 100
    });

    //sentences to show

    //mutual sentences

    //different sentences

    const calculateSentences = () => {
        const common = [];
        for(const quality in musicDiff){
            console.log(quality);
        }
    }

    const calculateDifference = (num1, num2) => {
        return Math.abs(num1 - num2);
    }

    const calculatePercentMatch = (yourOwnMusic, theirMusic) => {

        const update = {};
        for(const quality in musicDiff){
            update[quality] = calculateDifference(yourOwnMusic.trackQualities[quality], theirMusic[quality]);
            setMusicDiff({ ...musicDiff, ...update})
        }
    }

    useEffect(() => {
        calculatePercentMatch(yourMusic, trackQualities);
        setPercentage(Math.floor((1 - ((acousticness + danceability + energy + instrumentalness + liveness + valence) / 6)) * 100) + "%")
    }, [acousticness, danceability, energy, instrumentalness, liveness, valence])

    //need to find a way to render sentences based on the differences
    //also come up with these sentences!
    //i.e. you both like... songs that... you can dance to
    // you can show them... songs that... you can cry to

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{profileInfo.slideTitle[0]}</h2>
                </div>
                <div className="percentMatchSlide">
                    <div className="facts">
                        {percentage} match
                    </div>
                </div>
            </div>
        </Fragment>
    )
}