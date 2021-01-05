import React, { useState, useEffect, Fragment } from 'react';
import './SlidePercentMatch.css';
import { Track } from '../Track/Track';
import {Statement} from '../Statement/Statement';

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

    //qualities to show
    const [common, setCommon] = useState([]);

    //mutual sentences
    const [mutual, setMutual] = useState([]);

    //different sentences
    const [different, setDifferent] = useState([]);

    const calculateCommon = () => {

        const update = [];
        for(const quality in musicDiff){
            if(musicDiff[quality] < .2){
                update.push(quality);
                setCommon([...common, ...update])
                console.log(quality);
            }
        }

    }

    const calculateSentences = () => {

        const update = [];
        if(common.length > 3 && mutual.length < 3){
            if(yourMusic.trackQualities.acousticness > .6 ){
                update.push('songs that are acoustic');
                setMutual([...mutual, ...update])
            }
            if(yourMusic.trackQualities.danceability > .6 ){
                update.push('songs that you can dance to');
                setMutual([...mutual, ...update])
            }
            if(yourMusic.trackQualities.energy > .6 ){
                update.push('songs that are high energy');
                setMutual([...mutual, ...update])
            }
            if(yourMusic.trackQualities.valence > .6 ){
                update.push('songs that are happy');
                setMutual([...mutual, ...update])
            }
        }
        const updatedDifferent = []
        if(common.length < 3 && different.length < 3){
            if(yourMusic.trackQualities.acousticness > .6 && !common.includes('acousticness')){
                updatedDifferent.push('songs that are acoustic');
                setDifferent([...different, ...updatedDifferent])
            }
            if(yourMusic.trackQualities.danceability > .6 && !common.includes('danceability')){
                updatedDifferent.push('songs that you can dance to');
                setDifferent([...different, ...updatedDifferent])
            }
            if(yourMusic.trackQualities.energy < .6 && !common.includes('energy')){
                updatedDifferent.push('songs that are low energy');
                setDifferent([...different, ...updatedDifferent])
            }
            if(yourMusic.trackQualities.valence > .6 && !common.includes('valence')){
                updatedDifferent.push('songs that are happy');
                setDifferent([...different, ...updatedDifferent])
            }
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
        calculateCommon();
        setPercentage(Math.floor((1 - ((acousticness + danceability + energy + instrumentalness + liveness + valence) / 6)) * 100) + "%")
    }, [acousticness, danceability, energy, instrumentalness, liveness, valence])

    useEffect(() => {
        calculateSentences();
    }, [musicDiff]);

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
                    <div>
                        {
                            mutual.map(sentence => {
                                return <Statement sentence={sentence}/>
                            })
                        }
                    </div>
                </div>
                <div className="slideTitle">
                    <h2>{profileInfo.slideTitle[1]}</h2>
                </div>
                <div className="percentMatchSlide">
                    <div>
                        {
                            different.map(sentence => {
                                return <Statement sentence={sentence}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}