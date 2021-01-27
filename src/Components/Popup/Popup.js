import React, { useState, Fragment, useEffect } from 'react';
import './Popup.css';
import { TrackList } from '../FavoriteLyric/TrackList/TrackList';
import {Lyric} from '../FavoriteLyric/Lyric/Lyric';
import x from '../../images/x.png'

export function Popup(props) {

    const [lyricsSubmitted, setLyricsSubmitted] = useState(false);
    const [selectedLyricsArray, setSelectedLyricsArray] = useState([]);

    const handleFetchLyrics = () => {
        props.fetchLyrics();
    }

    const handleSelectedLines = () => {
        setLyricsSubmitted(true);
        const tempArray = [];
        for(const line in props.selectedLines){
            tempArray.push(props.selectedLines[line]);
        }
        setSelectedLyricsArray(tempArray);
    }

    const handleSubmission = () => {
        props.handleFavoriteSubmission();
    }

    if (props.isSeen) {
        if(lyricsSubmitted && selectedLyricsArray.length > 0){
            return (
                <div className='popup flexCenterColumn'>
                    <div className='glass window'>
                        <img onClick={props.handleXClick} className='x' src={x}/>
                        <h3>Okay, now which line is your favorite?</h3>
                        <Lyric lyrics={selectedLyricsArray}
                            handleFavoriteLyricSelect={props.handleFavoriteLyricSelect}
                            favoriteLyric={props.favoriteLyric}
                            lyricsSubmitted={lyricsSubmitted}/> 
                        {
                            props.selectedLines ? <button className='button' onClick={handleSubmission}>this is my favorite lyric</button> : ''
                        }
                    </div>
                </div>
            )
        }
        if(props.lyrics.length > 0){
            return (
                <div className='popup flexCenterColumn'>
                    <div className='glass window'>
                        <img onClick={props.handleXClick} className='x' src={x}/>
                        <h3>Of these lyrics, which are your favorite?</h3>
                        <Lyric lyrics={props.lyrics}
                            handleLineSelect={props.handleLineSelect} 
                            selectedLines={props.selectedLines}/> 
                        {
                            props.selectedLines ? <button className='button' onClick={handleSelectedLines}>these are my favorite lyrics</button> : ''
                        }
                    </div>
                </div>
            )
        }
        else if (props.tracks) {
            return (
                <div className='popup flexCenterColumn'>
                    <div className='glass window'>
                        <img onClick={props.handleXClick} className='x' src={x}/>
                        {
                            props.tracks ? <TrackList tracks={props.tracks}
                                handleTrackClick={props.handleTrackClick}
                                handleLineSelect={props.handleLineSelect} /> : ''
                        }
                        {
                            props.selectedTrack ? <button className='button' onClick={handleFetchLyrics}>find lyrics</button> : ''
                        }
                    </div>
                </div>
            )
        }

    }

    return(
        <Fragment>

        </Fragment>
    )

}