const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const path = require("path")


const authRouter = require('./routes/v1/auth');
const cvsRouter = require('./routes/v1/cvs');
const sectionsRouter = require('./routes/v1/sections');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api/v1', authRouter);
app.use('/api/v1/cv', cvsRouter);
app.use('/api/v1/section', sectionsRouter);

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use((err, req, res, next) => {
    console.log('global error handler');
    res.json(err);
});

module.exports = app;
