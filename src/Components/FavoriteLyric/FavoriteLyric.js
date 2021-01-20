import React, {useState, Fragment} from 'react';
import './FavoriteLyric.css';
require('dotenv').config();

export function FavoriteLyric(){

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`http://localhost:4000/lyrics`, {
                method: 'GET',
                headers: {token: sessionStorage.token}
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