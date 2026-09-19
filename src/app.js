const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config/config');

const app = express();

app.use(cors(
   {
     origin: config.CORS_ORIGIN,
     credentials: true,
   }
));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public'));
app.use(cookieParser());


module.exports = app;