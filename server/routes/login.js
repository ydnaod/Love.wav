const express = require('express');
const router = express.Router();
var querystring = require('querystring');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var cors = require('cors');
const fetch = require('node-fetch');
const pool = require('../db');
const { getMaxListeners } = require('process');
const { parse } = require('path');
const authorization = require('../middleware/authorization')

const client_id = process.env.clientId;
const client_secret = process.env.clientSecret;
let redirect_uri = 'http://localhost:4000/login/callback/';
let userToken;
let accessToken;
let expiresIn;

router.use(cookieParser());
router.use(cors());
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    next();
});
router.use(authorization);

const authorize = async (req, res, next) => {
    /*
    if (userToken) {
        //return userToken;
    }
    if (accessToken && expiresIn && userToken) {
        next();
        //return userToken
    }
    else {
        const refresh = await fetch('http://localhost:4000/login/refresh_token');
        const parseRefresh = await refresh.json();
        accessToken = parseRefresh.access_token;
        res.access_token = accessToken
        userToken = accessToken;
        expiresIn = parseRefresh.expires_in;
        setTimeout(() => userToken = '', expiresIn * 1000);
        setTimeout(() => accessToken = '', expiresIn * 1000);
        setTimeout(() => expiresToken = '', expiresIn * 1000);
        /*res.redirect('http://localhost:3000/#' +
                    querystring.stringify({
                        access_token: res.access_token
                    }));
                    
    }*/
    const id = req.user;
    //console.log(req.user);
    const refresh = await fetch(`http://localhost:4000/login/refresh_token/${id}`, {
        method: "GET",
        headers: { token: req.header('token') }
    });
    const parseRefresh = await refresh.json();
    accessToken = parseRefresh.access_token;
    res.access_token = accessToken
    userToken = accessToken;
    expiresIn = parseRefresh.expires_in;
    setTimeout(() => userToken = '', expiresIn * 1000);
    setTimeout(() => accessToken = '', expiresIn * 1000);
    setTimeout(() => expiresToken = '', expiresIn * 1000);

    next();
}

router.get('/loadPlaylist', authorize, async (req, res) => {
    try {
        const responseTwo = await fetch(`https://api.spotify.com/v1/users/1210606472/playlists`, {
            method: 'GET',
            json: true,
            headers: { 'Authorization': 'Bearer ' + res.access_token }
        })
        const parseResponseTwo = await responseTwo.json();
        //console.log(parseResponseTwo)
        res.json(parseResponseTwo)

    } catch (error) {
        console.error(error.message)
    }
})

router.get('/loadPlaylistTracks/:playlistId/', authorize, async (req, res) => {
    try {
        const responseTwo = await fetch(`https://api.spotify.com/v1/playlists/${req.params.playlistId}/tracks`, {
            method: 'GET',
            json: true,
            headers: { 'Authorization': 'Bearer ' + res.access_token }
        })
        const parseResponseTwo = await responseTwo.json();
        res.json(parseResponseTwo)
    } catch (error) {
        console.error(error.message)
    }
})

router.get('/getPlaylistQualities/:playlistTrackIds', authorize, async (req, res) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${req.params.playlistTrackIds}`, {
            method: 'GET',
            json: true,
            headers: { 'Authorization': 'Bearer ' + res.access_token }
        })
        const parseRes = await response.json();
        //console.log(parseRes);
        res.json(parseRes);
    } catch (error) {
        console.error(error.message);
    }
})

router.get('/theme_song/:id', authorize, async (req, res) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${req.params.id}`, {
            method: 'GET',
            json: true,
            headers: {
                'Authorization': 'Bearer ' + res.access_token,
            }
        })
        const parseRes = await response.json();
        res.json(parseRes);
    } catch (error) {
        console.error(error.message);
    }
})

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

router.get('/', function (req, res) {

    var state = req.user;
    res.cookie(stateKey, state);
    console.log('this happens')
    // your application requests authorization
    var scope = 'user-library-read';
    const url = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        });
    res.json(url);
    /*res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));*/
});


router.get('/callback', async function (req, res, next) {

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    /*
    console.log(code)
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {*/
        res.clearCookie(stateKey);
        const bodyToken = `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}`;
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                body: bodyToken,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const parseRes = await response.json();
            //console.log('we made it here')
            console.log(response)
            console.log(parseRes)
            if (parseRes.access_token) {

                var access_token = parseRes.access_token,
                    refresh_token = parseRes.refresh_token;
                console.log(state)
                console.log(refresh_token)
                const saveRefresh = await pool.query('update user_account set refresh_token = $1 where id = $2', [refresh_token, state])
                var options = {
                    url: `https://api.spotify.com/v1/users/1210606472/playlists`,
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                const responseTwo = await fetch(options.url, {
                    method: 'GET',
                    json: true,
                    headers: { 'Authorization': 'Bearer ' + access_token }
                })
                const parseResponseTwo = await responseTwo.json();
                console.log(parseResponseTwo)
                res.access_token = access_token;
                res.refresh_token = refresh_token;
                res.expires_in = 3600;
                res.redirect('http://localhost:3000/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
                next();
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        } catch (error) {
            console.error(error.message)
        }


    //}
});

router.get('/refresh_token/:id', async function (req, res, next) {
    try {
        //console.log(req.params.id)
        // requesting access token from refresh token
        var query = await pool.query('select refresh_token from user_account where id = $1', [req.params.id])

        refresh_token = await query.rows[0].refresh_token;

        const idString = client_id + ':' + client_secret;
        const bodyToken = `refresh_token=${refresh_token}&grant_type=refresh_token`;
        const bufferObj = Buffer.from(idString, "utf8")
        const base64String = bufferObj.toString("base64");
        const tokenRequest = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: bodyToken,
            headers: {
                'Authorization': 'Basic ' + base64String,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const parseTokenRequest = await tokenRequest.json();
        console.log('REFRESHED TOKEN')
        if (parseTokenRequest) {
            res.access_token = parseTokenRequest.access_token;
            res.expires_in = parseTokenRequest.expires_in;
            res.json(parseTokenRequest);
        }
        else {
            console.log('ooooops')
        }
    } catch (error) {
        console.error(error.message)
    }
});

module.exports = router;