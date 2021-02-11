import React, { useState, Fragment } from 'react';
import './Settings.css';
const restAPIUrl = require('../../Util/serverUrl')

export function Settings({ fetchUserId }) {

    const handleSubmit = async () => {
        try {
            const id = await fetchUserId();
            const response = await fetch(`${restAPIUrl.url}/login/login/${id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token, "Access-Control-Allow-Origin": "http://localhost:3000" },
            })
            const parseRes = await response.json();
            console.log(parseRes);
            window.location = parseRes;
            /*
            const responseTwo = await fetch('${restAPIUrl.url}/login/callback', {
                method: 'GET',
                headers: { token: sessionStorage.token }, 
            })
            console.log(responseTwo)*/
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <div className='glass settings'>
                <h2>Settings</h2>
                <button className='button' onClick={handleSubmit}>Connect Spotify Account</button>
            </div>
        </Fragment>
    )
}