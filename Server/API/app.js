const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');
const user = process.env.DB_CONNECTION_USER
const pass = process.env.DB_CONNECTION_PASSWORD
const port = process.env.PORT

//Import Routes
const postsRoute = require('./routes/Anime')


//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 1000000, limit: '10000kb'}))
app.use(bodyParser.json())
app.use('/vod', postsRoute.router);



//Connect to DB
mongoose.connect(
    `mongodb+srv://${user}:${pass}@cluster0.rjm7e3x.mongodb.net/Chakranim`,
     {useNewUrlParser: true},
      () => console.log('connected to DB!')
    );


//Scrap Data
postsRoute.scrap



//Listening to the server
app.listen(port || 4000)