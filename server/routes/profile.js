const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const query = await pool.query('select playlist_id, photo,theme_song_id, first_name from user_profile,user_account where user_account_id = $1', [1])
    res.json(query.rows[0]);
})

module.exports = router;