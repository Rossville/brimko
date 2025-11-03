const express = require('express');
const dotenv = require('dotenv');
const UserRoute = require('./routes/user-route.js');
const db_connect = require('./config/connection.js');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3100;

db_connect();
app.use('/user', UserRoute);

app.listen(PORT, function(){
    console.log(`Listening to the port: ${PORT}`);
})