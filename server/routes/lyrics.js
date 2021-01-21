const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const fetch = require('node-fetch');

router.use(authorization);

/*
//musix match api
router.get('/:trackId', async (req, res) => {
    const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${req.params.trackId}&apikey=${process.env.musix_match_apikey}`, {
        method: 'GET'
    });
    const parseRes = await response.json();
    console.log(parseRes.message.body.lyrics);
    res.json(parseRes.message.body.lyrics);
})

router.get('/search/:term', async (req, res) => {
    const response = await fetch(`http://api.musixmatch.com/ws/1.1/track.search?q_track=${req.params.term}&f_has_lyrics&s_track_rating=desc&apikey=${process.env.musix_match_apikey}`, {
        method: 'GET'
    });
    const parseRes = await response.json();
    //console.log(parseRes.message.body.lyrics);
    res.json(parseRes.message.body.track_list);
})*/

//deezer api to search for tracks
router.get('/search/:term', async (req, res) => {
    const response = await fetch(`https://api.deezer.com/search?q=${req.params.term}`, {
        method: 'GET'
    });
    const parseRes = await response.json();
    //console.log(parseRes.data);
    res.json(parseRes.data);
})

//lyrics.ovh api for lyrics
router.get('/:artist/:title', async (req, res) => {
    const response = await fetch(`https://api.lyrics.ovh/v1/${req.params.artist}/${req.params.title}`, {
        method: 'GET'
    });
    console.log(response)
    const parseRes = await response.json();
    console.log(parseRes.lyrics);
    res.json(parseRes.lyrics);
})


module.exports = router;