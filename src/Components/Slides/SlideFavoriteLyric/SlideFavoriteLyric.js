import React, { useState, useEffect, Fragment } from 'react';
import './SlideFavoriteLyric.css';
import { Track } from '../Track/Track'
import {Lyric} from '../../FavoriteLyric/Lyric/Lyric';

export function SlideFavoriteLyric({profileInfo, handleSendingGuess}) {

    const [selectedLine, setSelectedLine] = useState();

    const handleLineSelect = (index) => {
        setSelectedLine(index);
    }

    const handleClick = () => {
        handleSendingGuess(selectedLine);
    }

    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle">
                    <h2>guess their favorite lyric</h2>
                </div>
                <div className="lyricSlide">
                    <div className="lyrics">
                        <h3>{ profileInfo.favoriteLyricTitle} | {profileInfo.favoriteLyricArtist }</h3>
                        
                        <Lyric lyrics={profileInfo.lyrics}
                            handleLineSelect={handleLineSelect}
                            selectedLine={selectedLine} 
                            slideGuess={true}/>
                        {
                            selectedLine >= 0 ? <button onClick={handleClick} className='button'>Send your guess (this counts as a like)</button> : <button className='button'>Click a lyric to guess!</button>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}