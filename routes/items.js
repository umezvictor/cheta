/*
when user logs in, a token is issued to him. That token will be sent in the header for every page he tries to
access. The token will be verified and the id in it will be decoded. the system then finds the user with that id and 
grants access if verified.

In this route, the id will come from the id retrieved from the token issued at login
*/
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Items = require('../models/ReminderList');
const nodemailer = require ('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const async = require('async');
const config = require ('../config/keys');
const passport = require('passport');




// @route:  POST items/create/:id
// @description: create new reminder item
// @access: private

router.post('/create/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { title, details, remindMeBy } = req.body;

    if(!req.is('application/json')){
        return res.json({msg: 'only json allowed'});
    }

    const userId = req.params.id;  


    //array to hold all errors
    let errors = [];

    //if fields are empty
    if(!title || !details || !remindMeBy){
        errors.push({ msg: 'all fields are required' });
    }

    

    //if errors exist
    if(errors.length > 0){
        res.send(errors);
    } else {
         //find the user that created the reminder item, and save his namae with the records
    User.findOne({_id: userId }).then(user => {
        if(!user){ 
           errors.push({msg: 'Sorry, you need to login to access this feature'});
           res.send(errors);
        } else {
           
            const newItems = new Items({
                createdBy: user.firstname,
                creatorId: user._id,
                creatorEmail: user.email,
                creatorPhoneNumber: user.phone,
                title,//item was created by my name
                details,
                remindMeBy    
            });

              newItems.save()
                .then(res.json({msg: 'Reminder created successfully'}))
                .catch(err => console.log(err)); 
        }
    })
    }  
});


// @route:  POST items/fetch/:id
// @description: fetch items from db
// @access: private
//use the creatorId to get items unique to each user
router.get('/fetch/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
});


module.exports = router;

