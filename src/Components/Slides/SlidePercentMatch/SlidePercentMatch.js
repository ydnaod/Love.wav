import React, { useState, useEffect, Fragment } from 'react';
import './SlidePercentMatch.css';
import { Track } from '../Track/Track'

export function SlidePercentMatch(props) {

    //state variables for differences
    const [acousticnessDiff, setAcousticnessDiff] = useState();
    const [danceabilityDiff, setDanceabilityDiff] = useState();
    const [energyDiff, setEnergyDiff] = useState();
    const [instrumentalnessDiff, setInstrumentalnessDiff] = useState();
    const [livenessDiff, setLivenessDiff] = useState();
    const [valenceDiff, setValenceDiff] = useState();

    //percent match
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

    //need state variable to know which sentences to show

    //need state variable to check if there are more matches than not
    const []


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

    //need to find a way to render sentences based on the differences
    //also come up with these sentences!
    //i.e. you both like... songs that... you can dance to
    // you can show them... songs that... you can cry to

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>{props.profileInfo.slideTitle}</h2>
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