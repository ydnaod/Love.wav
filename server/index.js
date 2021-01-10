const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/usersRouter')
const pool = require('./db');
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

app.listen(4000, () => {
    console.log('listening on 4000')
})