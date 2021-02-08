import React, { useState, useEffect, Fragment } from 'react';
import './SlidePercentMatch.css';
import { Track } from '../Track/Track';
import { Statement } from '../Statement/Statement';

export function SlidePercentMatch({ profileInfo, profileInfo: { musicDiff, yourTrackQualities } }) {

    //sentences to show

    //mutual sentences
    const [mutual, setMutual] = useState([]);

    //different sentences
    const [different, setDifferent] = useState([]);

    const calculateCommon = () => {

        const update = [];
        for (const quality in musicDiff) {
            if (musicDiff[quality] <= .2) {
                update.push(quality);
                console.log(quality);
            }
        }
        return update;
    }

    const calculateSentences = () => {

        const sentences = {};
        if (yourTrackQualities.acousticness > .6) {
            sentences.acousticness = "songs that are acoustic";
        }
        if (yourTrackQualities.danceability >= .6) {
            sentences.danceability = 'songs that you can dance to';
        }
        if (yourTrackQualities.danceability < .6) {
            sentences.danceability = 'songs that are more for listening than dancing';
        }
        if (yourTrackQualities.energy >= .6) {
            sentences.energy = 'songs that are high energy';
        }
        if (yourTrackQualities.energy < .6) {
            sentences.energy = 'songs that are low energy';
        }
        if (yourTrackQualities.energy < .4) {
            sentences.energy = 'songs that you can chill out to';
        }
        if (yourTrackQualities.valence >= .6) {
            sentences.valence = 'songs that are happy';
        }
        if (yourTrackQualities.valence < .5) {
            sentences.valence = 'songs that you can cry to';
        }
        if (yourTrackQualities.instrumentalness > .5) {
            sentences.instrumentallness = 'songs that you can work to';
        }
        if (yourTrackQualities.tempo >= 100) {
            sentences.tempo = 'songs that are fast-paced';
        }
        if (yourTrackQualities.tempo < 100) {
            sentences.tempo = 'songs that are great for slow dancing and only slow dancing';
        }
        console.log(sentences);
        const common = calculateCommon();
        const updatedMutual = [];
        const updatedDifferent = [];
        for (const type in sentences) {
            if (common.includes(type)) {
                updatedMutual.push(sentences[type]);
            }
            else {
                updatedDifferent.push(sentences[type]);
            }
        }
        setMutual([...updatedMutual])
        setDifferent([...updatedDifferent]);
    }

    useEffect(() => {
        calculateSentences();
    }, [musicDiff]);

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>it seems you both like</h2>
                </div>
                <div className="percentMatchSlide">
                    <div className="sentence">
                        {
                            mutual.map((sentence, index) => {
                                return <Statement sentence={sentence}
                                    key={index} />
                            })
                        }
                    </div>
                </div>
                <div className="slideTitle">
                    <h2>you can show them</h2>
                </div>
                <div className="percentMatchSlide">
                    <div className="sentence">
                        {
                            different.map((sentence, index) => {
                                return <Statement sentence={sentence} 
                                key={index}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}