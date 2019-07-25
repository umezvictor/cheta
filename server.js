const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const webpush = require('web-push');
const Items = require('./models/ReminderList');
const moment = require('moment');



//const emailReminder = require('./cron_jobs/sendEmail');
//const smsReminder = require('./cron_jobs/sendSms');


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

//emailReminder.start();//send email reminder via cron job
//smsReminder.start();//send sms reminder via cron job


//passport middleware
app.use(passport.initialize());

//passport config (jwt strategy)
require('./config/passport')(passport);//passport is a parameter, must be passport, don't know why yet

//routes
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));

//send reminder via push notification 
const publicVapidKey = 'BDMXC0kSXBrhnb0eJKsAP-nQMMNr9eLi97fnZw-jrB6Ys2ndUroWsjcScM0kqaL0aoQDLbyucM2uqIAE3I6TYYE';
const privateVapidKey = '7QEQTvA9hHYrWflqRzeI1eUMgPore70eamjM7YJvacc';

webpush.setVapidDetails('mailto:victorblaze2010@gmail.com', publicVapidKey, privateVapidKey);


//new route for push
app.post('/subscribe', (req, res) => {
   
    Items.find({}, {title: 1, details: 1, remindMeBy: 1}).then(item => {
        //console.log(res.json());
        item.map(data => {

            const subscription = req.body;
            // const payload = data.title;
            const payload = JSON.stringify({title: data.title});
          
            
            const currentDateTime = moment().seconds(0).millisecond(0).toString();  
            const date = currentDateTime.toString();//convert to normal time format -- string format
          
            // console.log(date);
            //due date from database
            const dueDate = data.remindMeBy;
           
            var localDueDate = dueDate.toString();
            
            var index = localDueDate.indexOf(" (");
                     //if the index exists
                     if(~index){
                         localDueDate = localDueDate.substr(0, index); 
                         
                       //console.log();
                     }
                     if(date < localDueDate){
                         //console.log(`${date} is less than ${localDueDate}`);
                     }else if(date > localDueDate){
                       // console.log(`${date} is greater than ${localDueDate}`);
                     }else{
                       // console.log(`${date} is equal to ${localDueDate}`);
                        
                        webpush.sendNotification(subscription, payload).catch(err => console.error(err));
                     }
           
        });
            //get current date and time
            

        })
        .catch(err => console.log(err));
});



//client setup. static folder. React is used for the frontend
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});



//port
const port = process.env.PORT || 5000;//dev port or production port

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
