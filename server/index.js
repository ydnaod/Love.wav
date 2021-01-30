const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/usersRouter')
const pool = require('./db');
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')
const jwtRouter = require('./routes/jwtAuth');
const lyricsRouter = require('./routes/lyrics');
const fetchProfilesRouter = require('./routes/fetchProfiles')
const swipesRouter = require('./routes/swipes');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/account', jwtRouter);
app.use('/lyrics', lyricsRouter);
app.use('/fetch-profiles', fetchProfilesRouter);
app.use('/swipes', swipesRouter);

app.listen(4000, () => {
    console.log('listening on 4000')
})