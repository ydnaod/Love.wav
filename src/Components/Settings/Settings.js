import React, { useState, Fragment } from 'react';
import './Settings.css';

export function Settings({fetchUserId}) {

    const handleSubmit = async () => {
        try {
            const id = await fetchUserId();
            const response = await fetch(`http://localhost:4000/login/login/${id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token, "Access-Control-Allow-Origin" : "http://localhost:3000" }, 
            })
            const parseRes = await response.json();
            console.log(parseRes);
            window.location = parseRes;
            /*
            const responseTwo = await fetch('http://localhost:4000/login/callback', {
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
            <p>Settings</p>
            <button onClick={handleSubmit}>Connect Spotify Account</button>
        </Fragment>
    )
}