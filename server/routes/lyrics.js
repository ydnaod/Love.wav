const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const fetch = require('node-fetch');

router.use(authorization);

router.get('/', async (req, res) => {
    const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${process.env.musix_match_apikey}`, {
        method: 'GET'
    });
    const parseRes = await response.json();
    //console.log(parseRes.message.body.lyrics);
    res.json(parseRes.message.body.lyrics);
})

module.exports = router;