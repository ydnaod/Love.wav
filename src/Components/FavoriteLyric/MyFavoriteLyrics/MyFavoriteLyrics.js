import React, {useState, Fragment, useEffect} from 'react';
import './MyFavoriteLyrics.css';
import {Lyric} from '../Lyric/Lyric'

export function MyFavoriteLyrics({lyrics}){

    const [lyricsArray, setLyricsArray] = useState([]);

    useEffect(() => {
        const tempArray = [];
        tempArray.push(lyrics.line_one);
        tempArray.push(lyrics.line_two);
        tempArray.push(lyrics.line_three);
        tempArray.push(lyrics.line_four);
        tempArray.push(lyrics.line_five);
        setLyricsArray(tempArray);
    }, [lyrics])

    return(
        <Fragment>
            <p>{lyrics.song_title} | {lyrics.song_artist}</p>
            {
                lyricsArray ? <Lyric lyrics={lyricsArray}/> : ''
            }
        </Fragment>
    )
}