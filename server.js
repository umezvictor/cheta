const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const webpush = require('web-push');
const Items = require('./models/ReminderList');
const moment = require('moment');

const emailReminder = require('./cron_jobs/sendEmail');
const smsReminder = require('./cron_jobs/sendSms');

//init express
const app = express();

//bodyparser
app.use(bodyParser.json());

//get connection string
const db = config.MONGO_URI;

//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));//returns a promise
    mongoose.set('useFindAndModify', false);//prevents deprecation warning

emailReminder.start();//send email reminder via cron job  --runs automatically every one minute
smsReminder.start();//send sms reminder via cron job --  --runs automatically every one minute


//passport middleware
app.use(passport.initialize());

//passport config (jwt strategy)
require('./config/passport')(passport);//passport is a parameter, must be 'passport', don't know why yet

// routes
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));

//send reminder via push notification -- not done yet -- yet to figure out how to run it automatically
webpush.setVapidDetails('mailto:victorblaze2010@gmail.com', config.publicVapidKey, config.privateVapidKey);


//this api will be called by the front end -- see index.html, which then calls the serviceWorker and triggers the push notification
app.post('/subscribe', (req, res) => {
   //get the item title
    Items.find({}, {title: 1, details: 1, remindMeBy: 1}).then(item => {
        
        item.map(data => {

            const subscription = req.body;
          
            const payload = JSON.stringify({title: data.title});
          
             //current local time           
            const currentDateTime = moment().seconds(0).millisecond(0).toString();  
            const date = currentDateTime.toString();//remove west africa from it
            
            //due date from database
            const dueDate = data.remindMeBy;
           var localDueDate = dueDate.toString();
           
            
            var index = localDueDate.indexOf(" (");
                     //if the index exists
                     if(~index){
                         localDueDate = localDueDate.substr(0, index); 
                     }
                     //if set set due date time is less than current date time
                     if(date < localDueDate){
                         //console.log('Push not yet due');
                     }else if(date > localDueDate){
                       //console.log('Push overdue');
                     }else{   
                        webpush.sendNotification(subscription, payload).catch(err => console.error(err));
                     }
           
        });
        })
        .catch(err => console.log(err));
});


//serve static assets if in prduction  -- gives access to the front end routes built with react
if(process.env.NODE_ENV === 'production'){
//set static folder
app.use(express.static('client/build'));

//for any route other than the api routes, get the index.html file in build in client folder
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}




//port
const port = process.env.PORT || 5000;//dev port or production port

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
