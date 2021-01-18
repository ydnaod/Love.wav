import React, { useState, Fragment } from 'react';
import './Register.css';

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
            const response = await fetch('http://localhost:4000/account/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const parseRes = await response.json();
            console.log(parseRes)
            sessionStorage.setItem('token', parseRes.token);
            handleAuthorization(true);
            const response2 = await fetch(`http://localhost:4000/profile/create-profile`, {
                method: 'POST',
                headers: { token: sessionStorage.token }
            });
            console.log(response2);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name="first_name" placeholder='first name' value={first_name} onChange={handleChange}></input>
                <input type='text' name="last_name" placeholder='last name' value={last_name} onChange={handleChange}></input>
                <input type='email' name="email" placeholder='email' value={email} onChange={handleChange}></input>
                <input type='password' name="password" placeholder='password' value={password} onChange={handleChange}></input>
                <input type='password' name="passwordConfirmation" placeholder='re-enter password' value={passwordConfirmation} onChange={handleChange}></input>
                <button>Register</button>
            </form>
        </Fragment>
    )
}