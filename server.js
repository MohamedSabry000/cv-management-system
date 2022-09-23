require('dotenv').config();

const { DB_URL } = process.env;
const PORT = process.env.PORT || 5000;


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
app.listen(PORT, () => {
  console.log('server is running');
});
