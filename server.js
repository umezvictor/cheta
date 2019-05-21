//run npm run server for nodemon
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');//for autherntication

//const path = require('path');

const app = express();


//bodyparser
app.use(bodyParser.json());
//o speak from the heavens and i will Header from earth
//my altar is calling you
//connection string
const db = config.MONGO_URI;

//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));//returns a promise
    mongoose.set('useFindAndModify', false);//prevents deprecation warning


//passport middleware
app.use(passport.initialize());

//passport config (jwt strategy)
require('./config/passport')(passport);//passport is a parameter, must be passport, don't know why yet

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));
//app.use('/users', require('./routes/users'));

//port
const port = 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
