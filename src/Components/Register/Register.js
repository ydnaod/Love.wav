import React, { useState, Fragment } from 'react';
import './Register.css';
const restAPIUrl = require('../../Util/serverUrl')

export function Register({ handleAuthorization }) {

    const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const { first_name, last_name, email, password, passwordConfirmation } = inputs;

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const body = { first_name, last_name, email, password }
            if (password !== passwordConfirmation) {
                throw 'passwords must match'
            }
            const response = await fetch(`${restAPIUrl.url}/account/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const parseRes = await response.json();
            console.log(parseRes)
            sessionStorage.setItem('token', parseRes.token);
            handleAuthorization(true);
            const response2 = await fetch(`${restAPIUrl.url}/profile/create-profile`, {
                method: 'POST',
                headers: { token: sessionStorage.token, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(response2.json());
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <div className='glass settings'>
                <h2>Register</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <input type='text' name="first_name" placeholder='first name' value={first_name} onChange={handleChange}></input>
                    <input type='text' name="last_name" placeholder='last name' value={last_name} onChange={handleChange}></input>
                    <input type='email' name="email" placeholder='email' value={email} onChange={handleChange}></input>
                    <input type='password' name="password" placeholder='password' value={password} onChange={handleChange}></input>
                    <input type='password' name="passwordConfirmation" placeholder='re-enter password' value={passwordConfirmation} onChange={handleChange}></input>
                    <button className='button'>Register</button>
                </form>
            </div>
        </Fragment>
    )
}