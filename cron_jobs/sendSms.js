const Items = require('../models/ReminderList');
const config = require('../config/keys');
const cron = require('node-cron');//module for running cron jobs
const moment = require('moment');
const Nexmo = require('nexmo');  //for sending sms

//send sms reminder, run script every minute

//run script every one minute
const smsReminder = cron.schedule('* * * * *', () => {
       Items.find({}, { createdBy: 1, creatorPhoneNumber: 1, title: 1, details: 1, completed: 1, remindMeBy: 1 })
        .then(item => {
                item.map(data => {

                    /*
                     upgrade nexmo account to send sms to other numbers
                    server returns number like this -- 8138551452, needs to be in this format 2348138551452

                    use this format for commercial production -- not hardcoded phone number
                    const phoneNumber = data.creatorPhoneNumber;
                    const countryCode = 234;
                    concatenate numbers to get valid phone number format
                    const validPhoneNumber = `${countryCode}${phoneNumber}`

                    var utcDate = '2011-06-29T16:52:48.000Z';  // ISO-8601 formatted date returned from server
                    var localDate = new Date(utcDate);-8601 format, needs to be converted to local time 
                    */
                   
                     const currentDateTime = moment();
                     const date = currentDateTime.toString();

                     //dueDate is returned from the server in iso
                     const dueDate = data.remindMeBy;
                     var localDueDate = dueDate.toString();
                     //remove (west africa standard time) from the date returned
                      // this should be safe since nothing else in the date string contains a opening paren
                     var index = localDueDate.indexOf(" (");
                     //if the index exists
                     if(~index){
                         localDueDate = localDueDate.substr(0, index);
                     }
                   //if due date time and date matches current time and date
                     if(date === localDueDate){
                          
               
                        const nexmo = new Nexmo({
                        apiKey: config.NexmoApiKey,
                        apiSecret: config.NexmoSecretKey
                        });

                        const from = 'Nexmo';
                        const to = '2348138551452';
                        const text = `Hello ${data.createdBy} it is time to ${data.title}`;   
                        nexmo.message.sendSms(from, to, text);     
                     }
                });//end of map
               
        })
        .catch(err => console.log(err));
                       
 });
    
module.exports = smsReminder;


    

