const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');


router.use(authorization);

router.param('id', async (req, res, next) => {
    try {
        const query = await pool.query('select playlist_id, photo,theme_song_id, first_name from user_profile,user_account where user_account_id = $1', [req.params.id])
        if (query.rows.length == 0) {
            res.status(404).send('user not found');
        }
        req.id = req.params.id;
        next();
    } catch (error) {
        console.error(error.message);
    }
})

router.get('/:id', async (req, res) => {
    const query = await pool.query('select playlist_id, photo,theme_song_id, first_name from user_profile,user_account where user_account_id = $1', [req.id])
    res.json(query.rows[0]);
})

//update playlist
router.put('/:id/playlist', async (req, res) => {
    try {
        const {playlistId} = req.body;
        //console.log(playlistId);
        const query = await pool.query(`update user_profile set playlist_id=$1 where user_account_id = $2 returning *`, [playlistId, req.id])
        console.log(query)
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//create profile
router.post('/create-profile', async (req, res) => {
    try {
        const query = await pool.query('insert into user_profile (user_account_id) values ($1) returning *', [req.user]);
        res.json(query.rows);
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router;