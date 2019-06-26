const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const Items = require('../models/ReminderList');
const config = require('../config/keys');
const cron = require('node-cron');//module for running cron jobs
const moment = require('moment');
/*
process
1. fetch all users from db
2. check if due date/time is complete
3. send email notification if complete
*/

//send email reminder, run script every minute
const task = cron.schedule('* * * * *', () => {
       //User.find({}, { name: 1, email}); 
       Items.find({}, { createdBy: 1, creatorEmail: 1, creatorPhoneNumber: 1, title: 1, details: 1, completed: 1, remindMeBy: 1 })
        .then(item => {
                item.map(data => {
                    //var utcDate = '2011-06-29T16:52:48.000Z';  // ISO-8601 formatted date returned from server
                    //var localDate = new Date(utcDate);-8601 format, needs to be converted to local time 
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
                    

                        //https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
                  
                     
                     if(date === localDueDate){
                             
                             const message = `
                                <h3>Reminder to ${data.createdBy}</h3>
                                <p>Title: ${data.title}</p>
                                <p>Details: ${data.details}</p>

                             `;

                             const transporter = nodemailer.createTransport(sendGridTransport({
                                auth: {
                                        api_key: config.SengridApiKey
                                }
                             }));
                             //
                             const mailOptions = {
                                     to: data.creatorEmail,
                                     from: 'umezvictor123@gmail.com',
                                     subject: `Cheta - Reminder for ${data.createdBy}`,
                                     html: message
                             }
                             //send mail
                             transporter.sendMail(mailOptions, function(err){
                                   if(err){
                                           console.log('reminder not sent');
                                   }else{
                                           console.log(`reminder was sent to ${data.creatorEmail} on ${data.remindMeBy}`);
                                   }     
                             });
                     }
                });//end of map
               
        })
        .catch(err => console.log(err));
                       
 });
    
module.exports = task;

