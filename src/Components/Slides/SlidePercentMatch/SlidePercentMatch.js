import React, { useState, useEffect, Fragment } from 'react';
import './SlidePercentMatch.css';
import { Track } from '../Track/Track'

export function SlidePercentMatch({ profileInfo, profileInfo: { trackQualities } }) {

    //state variables to hold differences between profiles
    const [musicDiff, setMusicDiff] = useState(
        {
            acousticnessDiff: 0,
            danceabilityDiff: 0,
            energyDiff: 0,
            instrumentalnessDiff: 0,
            livenessDiff: 0,
            valenceDiff: 0
        }
    );
    
    //destructure the difference variables
    const { acousticnessDiff, danceabilityDiff, energyDiff, instrumentalnessDiff, livenessDiff, valenceDiff } = musicDiff;

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

    const calculateDifference = (num1, num2) => {
        return Math.abs(num1 - num2);
    }

    const calculatePercentMatch = (yourOwnMusic, theirMusic) => {

        setMusicDiff({
            ...musicDiff,
            acousticnessDiff: calculateDifference(yourOwnMusic.trackQualities.acousticness, theirMusic.acousticness),
            danceabilityDiff: calculateDifference(yourOwnMusic.trackQualities.danceability, theirMusic.danceability),
            energyDiff: calculateDifference(yourOwnMusic.trackQualities.energy, theirMusic.energy),
            instrumentalnessDiff: calculateDifference(yourOwnMusic.trackQualities.danceability, theirMusic.danceability),
            livenessDiff: calculateDifference(yourOwnMusic.trackQualities.liveness, theirMusic.liveness),
            valenceDiff: calculateDifference(yourOwnMusic.trackQualities.valence, theirMusic.valence)
        })

    }

    useEffect(() => {
        calculatePercentMatch(yourMusic, trackQualities);
        setPercentage(Math.floor((1 - ((acousticnessDiff + danceabilityDiff + energyDiff + instrumentalnessDiff + livenessDiff + valenceDiff) / 6)) * 100) + "%")
    }, [acousticnessDiff, danceabilityDiff, energyDiff, instrumentalnessDiff, livenessDiff, valenceDiff])

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{profileInfo.slideTitle}</h2>
                </div>
                <div className="percentMatchSlide">
                    <div className="facts">
                        {percentage}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}