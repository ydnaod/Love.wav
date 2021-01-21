const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const fetch = require('node-fetch');

router.use(authorization);

//musixmatch api
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
})

router.post('/save-favorite-lyric', async (req, res) => {
    const {song_artist, song_title, favorite_lyric, line_one, line_two, line_three, line_four, line_five} = req.body;
    //console.log(song_artist);
    const query = await pool.query('insert into lyrics_slide (user_account_id, song_artist, song_title, favorite_lyric, line_one, line_two, line_three, line_four, line_five) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *', [req.user, song_artist, song_title, favorite_lyric, line_one, line_two, line_three, line_four, line_five]);
    res.json(query.rows[0]);
})

//free apis aren't compatible enough with each other for this
/*
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
    //console.log(response)
    const parseRes = await response.json();
    //console.log(parseRes.lyrics);
    res.json(parseRes.lyrics);
})*/

module.exports = router;