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
    const query = await pool.query('update user_profile')
})

module.exports = router;