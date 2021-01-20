import React, {useState, Fragment} from 'react';
import './FavoriteLyric.css';
require('dotenv').config();

export function FavoriteLyric(){

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${process.env.musix_match_apikey}`, {
                method: 'GET'
            });
            const parseRes = await response.json();
            console.log(parseRes)
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <Fragment>
            <p>Favorite lyric</p>
            <button onClick={fetchLyrics}>click to fetch</button>
        </Fragment>
    )
}