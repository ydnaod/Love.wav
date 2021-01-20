const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const fetch = require('node-fetch');

router.use(authorization);

router.get('/:trackId', async (req, res) => {
    const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${req.params.trackId}&apikey=${process.env.musix_match_apikey}`, {
        method: 'GET'
    });
    const parseRes = await response.json();
    //console.log(parseRes.message.body.lyrics);
    res.json(parseRes.message.body.lyrics);
})

router.get('/search/:term', async (req, res) => {
    const response = await fetch(`http://api.musixmatch.com/ws/1.1/track.search?q_track=${req.params.term}&f_has_lyrics&s_track_rating=desc&apikey=${process.env.musix_match_apikey}`, {
        method: 'GET'
    });
    const parseRes = await response.json();
    //console.log(parseRes.message.body.lyrics);
    res.json(parseRes.message.body.track_list);
})

module.exports = router;