const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');


router.use(authorization);

router.get('/', async (req, res) => {
    try {
        const query = await pool.query('select id, user_account_id, other_user_account_id from conversation where user_account_id = $1 or other_user_account_id = $1;', [req.user]);
        //console.log(query.rows)
        res.json(query.rows)
    } catch (error) {
        console.error(error.message);
    }
})

router.get('/:id/messages', async (req, res) => {
    try {
        const query = await pool.query('select user_account_id, message, conversation_id from message where conversation_id = $1;', [req.params.id]);
        console.log(query.rows)
        res.json(query.rows)
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;