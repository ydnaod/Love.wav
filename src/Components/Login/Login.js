import React, { useState, Fragment } from 'react';
import './Login.css';
const restAPIUrl = require('../../Util/serverUrl');


export function Login({ handleAuthorization }) {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = { email, password };
            const response = await fetch(`${restAPIUrl.url}/account/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();
            console.log(parseRes)
            sessionStorage.setItem('token', parseRes.token)
            handleAuthorization(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleDemoSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = { "email":"demo@gmail.com", "password":"demo" };
            const response = await fetch(`${restAPIUrl.url}/account/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();
            console.log(parseRes)
            sessionStorage.setItem('token', parseRes.token)
            handleAuthorization(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <div className='glass settings'>
                <h2>Login</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <input type='email' name='email' placeholder='email' value={email} onChange={handleChange}></input>
                    <input type='password' name='password' placeholder='password' value={password} onChange={handleChange}></input>
                    <button className = 'button'>Login</button>
                </form>
                <form className='form' onSubmit={handleDemoSubmit}>
                    <h2>Hate signing up for things?</h2>
                    <button className = 'button'>Demo Login</button>
                </form>
            </div>
        </Fragment>
    )
}