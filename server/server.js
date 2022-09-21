require('dotenv').config();

const { DB_URL, PORT, HOST } = process.env;

const mongoose = require('mongoose');
const app = require('./app');


// Mongo Connect
mongoose
.connect(DB_URL)
.then(() => {
  console.log('hello connected');
})
.catch(() => {
  console.log('nooooooooooo');
});


// Server Listen
app.listen(PORT, HOST, () => {
  console.log('server is running');
});
