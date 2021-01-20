import React, {useState, Fragment} from 'react';
import './FavoriteLyric.css';
require('dotenv').config();

export function FavoriteLyric(){

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`http://localhost:4000/lyrics/`, {
                method: 'GET',
                headers: {token: sessionStorage.token}
            });
            const parseRes = await response.json();
            console.log(parseRes)
        } catch (error) {
            console.error(error.message)
        }
    }

    const search = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/lyrics/search/${input}`, {
                method: 'GET',
                headers: {token : sessionStorage.token}
            });
            const parseRes = await response.json();
            console.log(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }

    return(
        <Fragment>
            <p>Favorite lyric</p>

            <form onSubmit={search}>
                <input type="text" name="search" placeholder="type a song name" onChange={handleChange} value={input}></input>
                <button>search</button>
            </form>
        </Fragment>
    )
}