const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const authRouter = require('./routes/v1/auth');
const cvsRouter = require('./routes/v1/cvs');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));


app.use('/api/v1', authRouter);
app.use('/api/v1/cv', cvsRouter);

app.all('*', (req, res) => {
    res.json({
        status: 'failure',
        message: 'wrong url'
    })
});

app.use((err, req, res, next) => {
    console.log('global error handler');
    res.json(err);
});

module.exports = app;
