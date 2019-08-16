const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const nodemailer = require ('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
// const async = require('async');
// const crypto = require('crypto');//for generating random numbers, comes with node modules by default
const config = require ('../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//const jwtDecode = require('jwt-decode');

const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

// @route:  POST users/register
// @description: register new user
// @access: public

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

        //check validation
        if(!isValid){
            return res.status(400).json(errors);
        }
        //check if user already exists
        User.findOne({ email: req.body.email }).then(user => {
        if (user){ 
           errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
           
            //create new user object
            const newUser = new User({
                firstname: req.body.firstname,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                activateToken: 'myfaketoken'
            });

            //encrypt password and save data to db
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {

            if(err) throw err;
            newUser.password = hash;

            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));

            }));//end of bcrypt, user saved    
        }
    })//end of .then   
});


// @route:  POST users/login
// @description: login user, return jwt token
// @access: public

router.post('/login', (req, res) => {

    //validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

        //find user by email
      User.findOne({email: email}).then(user => {
            //check for user
        if(!user){
               errors.email = 'User not found';
               return res.status(404).json(errors);
            }


//if you remove err from the call back, it will return user not found
          bcrypt.compare(password, user.password, (err, isMatch) => {
              if(isMatch){ 
                  //'result' can also be used in place of 'isMatch'
                  //create payload, don't include sensitive info like password
                  const payload = {id: user._id, firstname: user.firstname};
                // console.log(payload);
                 
                //create token 
                
                  const token = jwt.sign(payload, config.JWT_SECRET, {
                      expiresIn: 3600//86400, expires in 24hrs or 1 day//  3600s expires in 1hour
                  });

                  res.json({
                      success: true,
                      token: 'Bearer ' + token //used a Bearer token
                });
              }else{
                  errors.password = 'Password incorrect';
                  return res.status(404).json(errors);
              }
          });

         
            
        })
        .catch(err => console.log('something went wrong, user not found'));
        //this line prevents unhandledd promise rejection warning
    
});



// @route:  GET users/current
// @description: find current user, return user that has the token
// @access: private
/*
note
passport.authenticate('jwt'), jwt here represents the strategy used. In this case jwt is used
*/
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
      res.json({
        id: req.user._id,
        name: req.user.firstname,
        email: req.user.email
      });
    }
  );


// @route:  PUT users/current/:id
// @description: update user account
// @access: private

router.put('/current/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
   //check if content type is json
   if(!req.is('application/json')){
       //change the status code below, find code for bad request
       return res.json({msg: 'only json format allowed'});
       //failure to use return statement flashes an error
       //always use return at the first res when you have more than one in code segment
   }
   try {
       const updatedProfile = await User.findByIdAndUpdate({_id: req.params.id}, req.body);
       res.sendStatus(200);//ok
   } catch (error) {
       res.json({msg: 'Update failed, please try again'});
   }
});

// @route:  DEL users/current/:id
// @description: delete user account
// @access: private

router.delete('/current/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {

    try {
        const deleteProfile = await User.findOneAndRemove({_id: req.params.id});
       res.status(200).json({msg: 'Your account has been deleted successfully'})
    } catch (error) {
        res.json({msg: 'Operation failed, please try again'});
    }
 });

 
        
module.exports = router;

