const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');


router.use(authorization);

router.post('/', async (req, res) => {
    try {
        const {user_account_id, other_user_account_id, swiped} = req.body;
        console.log(req.body);
        const query = await pool.query('insert into swipes (user_account_id, other_user_account_id, swiped) values ($1, $2, $3)', [user_account_id, other_user_account_id, swiped]);
        console.log(query.rows)
        res.json(query.rows)
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;