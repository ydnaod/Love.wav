const express = require('express');
const router = express.Router();
var querystring = require('querystring');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var cors = require('cors');
const fetch = require('node-fetch');

const client_id = process.env.clientId;
const client_secret = process.env.clientSecret;
const redirect_uri = 'http://localhost:4000/login/callback/';

router.use(cookieParser());
router.use(cors());


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


router.get('/callback', async function (req, res) {

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
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
        const bodyToken = `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}`;
        console.log(bodyToken);
        /*const bodyToken = {
            code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code',
                client_id: client_id,
                client_secret: client_secret
        }*/
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: bodyToken,
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
                //'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64'))
            }
        })
        const parseRes = await response.json();
        console.log(parseRes)
        request.post(authOptions, function (error, response, body) {
            console.log('we made it here')
            console.log(body);
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
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
        });
    }
});



module.exports = router;