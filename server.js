const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
//const task = require('./cron_jobs/index');

const app = express();


//bodyparser
app.use(bodyParser.json());

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
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));



//client setup. static folder. React is used for the frontend
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

 
// cron job
//task.start();

//port
const port = process.env.PORT || 5000;//dev port or production port

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
