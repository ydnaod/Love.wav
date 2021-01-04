import React, { useState, useEffect, Fragment } from 'react';
import './SlidePercentMatch.css';
import { Track } from '../Track/Track'

export function SlidePercentMatch(props) {

    const [acousticnessDiff, setAcousticnessDiff] = useState();
    const [danceabilityDiff, setDanceabilityDiff] = useState();
    const [energyDiff, setEnergyDiff] = useState();
    const [instrumentalnessDiff, setInstrumentalnessDiff] = useState();
    const [livenessDiff, setLivenessDiff] = useState();
    const [valenceDiff, setValenceDiff] = useState();
    const [percentage, setPercentage] = useState("");
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


    const calculateDifference = (num1, num2) => {
        return Math.abs(num1 - num2);
    }

    const calculatePercentMatch = (yourOwnMusic, theirMusic) => {

        setAcousticnessDiff(calculateDifference(yourOwnMusic.trackQualities.acousticness, theirMusic.trackQualities.acousticness));
        setDanceabilityDiff(calculateDifference(yourOwnMusic.trackQualities.danceability, theirMusic.trackQualities.danceability));
        setEnergyDiff(calculateDifference(yourOwnMusic.trackQualities.energy, theirMusic.trackQualities.energy));
        setInstrumentalnessDiff(calculateDifference(yourOwnMusic.trackQualities.danceability, theirMusic.trackQualities.danceability));
        setLivenessDiff(calculateDifference(yourOwnMusic.trackQualities.liveness, theirMusic.trackQualities.liveness));
        setValenceDiff(calculateDifference(yourOwnMusic.trackQualities.valence, theirMusic.trackQualities.valence));
    }

    useEffect(() => {
        calculatePercentMatch(yourMusic, props.profileInfo);
        setPercentage(Math.floor((1 - ((acousticnessDiff + danceabilityDiff + energyDiff + instrumentalnessDiff + livenessDiff + valenceDiff) / 6)) * 100) + "%")
    }, [acousticnessDiff, danceabilityDiff, energyDiff, instrumentalnessDiff, livenessDiff, valenceDiff])

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{props.profileInfo.slideTitle}</h2>
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