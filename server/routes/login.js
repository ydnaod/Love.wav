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

const client_id = process.env.clientId;
const client_secret = process.env.clientSecret;
const redirect_uri = 'http://localhost:4000/login/callback/';
let userToken;
let accessToken;
let expiresIn;

router.use(cookieParser());
router.use(cors());
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const authorize = async (req, res, next) => {
        if(userToken){
            return userToken;
        }
        if(accessToken && expiresIn){
            userToken = accessToken;
            setTimeout(() => userToken = '', expiresIn * 1000);
            return userToken
        }
        else{
            const refresh = await fetch('http://localhost:4000/login/refresh_token');
            const parseRefresh = await refresh.json();
            accessToken = parseRefresh.access_token;
            res.access_token = accessToken
            userToken = accessToken;
            expiresIn = parseRefresh.expires_in;
        }
    
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
        console.log(parseResponseTwo)
        res.json(parseResponseTwo)

    } catch (error) {
        console.error(error.message)
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

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-library-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});


router.get('/callback', async function (req, res, next) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
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
            console.log(parseRes)
            console.log('we made it here')
            if (parseRes.access_token) {

                var access_token = parseRes.access_token,
                    refresh_token = parseRes.refresh_token;

                    const saveRefresh = await pool.query('update user_account set refresh_token = $1 where email = $2', [refresh_token, 'test@gmail.com'])
                var options = {
                    url: `https://api.spotify.com/v1/users/1210606472/playlists`,
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                //use the access token to access the Spotify Web API
                /*request.get(options, function (error, response, body) {
                    console.log(body);
                });*/

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
                next();
                // we can also pass the token to the browser to make requests from there
                res.redirect('http://localhost:3000/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        } catch (error) {
            console.error(error.message)
        }


    }
});

router.get('/refresh_token', async function(req, res, next) {

    // requesting access token from refresh token
    var query = await pool.query('select refresh_token from user_account where email = $1', ['test@gmail.com'])
    refresh_token = query.rows[0].refresh_token;
    /*
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };*/
  
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
    if(parseTokenRequest){
        res.access_token = parseTokenRequest.access_token;
        res.expires_in = parseTokenRequest.expires_in;
        res.json(parseTokenRequest);
    }
    else{
        console.log('ooooops')
    }
  });

module.exports = router;