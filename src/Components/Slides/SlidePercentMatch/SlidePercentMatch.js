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

    //mutual sentences
    const [mutual, setMutual] = useState([]);

    //different sentences
    const [different, setDifferent] = useState([]);

    const calculateCommon = () => {

        const update = [];
        for(const quality in musicDiff){
            if(musicDiff[quality] <= .2){
                update.push(quality);
                //setCommon([...common, ...update])
                console.log(quality);
            }
            //console.log(quality);
        }
        return update;
    }

    const calculateSentences = () => {

        const sentences = {};
        if(yourMusic.trackQualities.acousticness > .6){
            //sentences.push('songs that are acoustic');
            sentences.acousticness = "songs that are acoustic";
        }
        if(yourMusic.trackQualities.danceability > .6){
            //sentences.push('songs that you can dance to');
            sentences.danceability = 'songs that you can dance to';
        }
        if(yourMusic.trackQualities.energy >= .6){
            //sentences.push('songs that are high energy');
            sentences.energy = 'songs that are high energy';
        }
        if(yourMusic.trackQualities.energy < .4){
            //sentences.push('songs that you can chill out to');
            sentences.energy = 'songs that you can chill out to';
        }
        if(yourMusic.trackQualities.valence >= .6){
            //sentences.push('songs that are happy');
            sentences.valence = 'songs that are happy';
        }
        if(yourMusic.trackQualities.valence < .4){
            //sentences.push('songs that you can cry to');
            sentences.valence = 'songs that you can cry to';
        }
        if(yourMusic.trackQualities.instrumentalness > .5){
            //sentences.push('songs that you can work to');
            sentences.instrumentallness = 'songs that you can work to';
        }
        if(yourMusic.tempo >= 100){
            //sentences.push('songs that are fast-paced');
            sentences.tempo = 'songs that are fast-paced';
        }
        if(yourMusic.tempo < 80){
            //sentences.push('songs that you can probably slow dance to');
            sentences.tempo = 'songs that you can probably slow dance to';
        }
        console.log(sentences);
        const common = calculateCommon();
        const updatedMutual = [];
        const updatedDifferent = [];
        for(const type in sentences){
            if(common.includes(type)){
                updatedMutual.push(sentences[type]);
            }
            else{
                updatedDifferent.push(sentences[type]);
            }
        }
        setMutual([...updatedMutual])
        setDifferent([...updatedDifferent]);
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
                                return <Statement sentence={sentence}
                                    /*key={mutual.findIndex(sentence)}*//>
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