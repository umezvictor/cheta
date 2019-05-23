const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require ('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const async = require('async');
const crypto = require('crypto');//for generating random numbers, comes with node modules by default
const config = require ('../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtDecode = require('jwt-decode');



// @route:  POST users/register
// @description: register new user
// @access: public

router.post('/register', (req, res) => {

    const { firstname, gender, email, phone, password } = req.body;


    //array to hold all errors
    let errors = [];

    //if fields are empty
    if(!firstname || !gender || !email || !phone || !password){
        errors.push({ msg: 'all fields are required' });
    }

    if(password.length < 6){
        errors.push({ msg: 'password field should be at least 6 characters' });
    }


    //validate phone number
    const phoneRegex = /^[0-9]+$/;
    if(phoneRegex.test(phone) === false){
        errors.push({ msg: 'only numbers are allowed' })
    }
    //validate firstname
    const regex = /^[A-Za-z]+$/;
    if(regex.test(firstname) === false){
        errors.push({ msg: 'only alphabets are allowed' })
    }

    //if errors exist
    if(errors.length > 0){
        res.send(errors);
    } else {
         //no errors in input, check if user already exists
    User.findOne({ email: email }).then(user => {
        if(user){ 
           errors.push({msg: 'user already exists'});
           res.send(errors);
        } else {
           
            const newUser = new User({
                firstname,
                gender,
                email,
                phone,
                password,
                activateToken: 'myfaketoken'
            });

            //encrypt password and save data to db
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {

                if(err) {
                    console.log(err);
                }

                newUser.password = hash;

                //save user and send email to activate account
            newUser.save()
            .then(user => {
                res.json({msg: 'user added successfully'})
            })
            .catch(err => console.log(err));

            }));//end of bcrypt, user saved    
        }
    })//end of .then
    }//end of else
    
   
});



// @route:  POST users/register
// @description: register new user and send activation email
// @access: public


//register a user and send an activation email simultaenously

// router.post('/register', (req, res) => {

//     const { firstname, gender, email, phone, password } = req.body;

//     let errors = [];

//     //if fields are empty
//     if(!firstname || !gender || !email || !phone || !password){
//         errors.push({ msg: 'all fields are required' });
//     }

//     if(password.length < 6){
//         errors.push({ msg: 'password field should be at least 6 characters' });
//     }

//     //validate phone number
//     const phoneRegex = /^[0-9]+$/;
//     if(phoneRegex.test(phone) === false){
//         errors.push({ msg: 'only numbers are allowed' })
//     }
//     //validate firstname
//     const regex = /^[A-Za-z]+$/;
//     if(regex.test(firstname) === false){
//         errors.push({ msg: 'only alphabets are allowed' })
//     }

//     //if errors exist
//     if(errors.length > 0){
//         res.send(errors);
//     } 
   
//       //create transporter
//     const transporter = nodemailer.createTransport(sendgridTransport({
//         auth: {
//             api_key: config.SengridApiKey
//         }
//     }));
    
//     async.waterfall([
//         function(done){
//             //finding the user is a failure, not finding the user is success, so there is no user to return 
//             //yet after this first function
//             User.findOne({email: email}).exec(function(err, user){
//                 if(user){
//                     res.json({msg: 'user already exists'});
//                 }else{
//                     done(err)
//                 }
//             });
//         },
//       function(done){
//           //generate token 
//           crypto.randomBytes(20, function(err, buf){
//             const token = buf.toString('hex');
//             done(err, token)
//           });
//       },
//       function(token){
//           //create user object
//          //es6 destructuring is used here, same as email:email, name:name   
//           const newUser = new User({
//             firstname,
//             gender,
//             email,
//             phone,
//             password,
//             activateToken: token
//         });
//       },
//       function(token, newUser){
//         bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {

//             if(err) {
//                 console.log(err);
//             }

//             newUser.password = hash;

//             //email params
//              //email parameter
//              var emailParams = {
//                 to: newUser.email,
//                 from: 'victorblaze2010@gmail.com',
//                 subject: 'Activate your account',
//                 html: `<p>http://localhost:5000/users/activate-account/${token}</p>`
//             }

//             //save data and send email
//             newUser.save().then(
//                 transporter.sendMail(emailParams, err => {
//                     if(!err){
//                         res.json({ msg: 'Registration successful. We have sent you an email, please click on the link in the email to activate your account' });
//                     }else{
//                         res.json({msg: 'something went wrong, please try again'});
//                     }
//                 })
//             )
//                 .catch(err => console.log(err));
//       }));
//     }
//     ], function(err){
//         res.json({msg: 'something went wrong, try again'});
//     })
// });





// @route:  POST users/login
// @description: login user, return jwt token
// @access: public

router.post('/login', (req, res) => {

    const { email, password } = req.body;//use destructuring to pull out  data from request body
   

    //validation

    let errors = [];

    if(email === '' || password === ''){
        errors.push({msg: 'all fields are required'});
    }

    //validate email later

    if(errors.length > 0){
        res.send(errors);
    }
        //find user in database
      User.findOne({email: email}).then(user => {
            if(!user){
                errors.push({msg: 'user not found'});
                res.send(errors);
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
                      expiresIn: 86400//expires in 24hrs
                  });

                //   const decoded = jwtDecode(token);//decode token
                //   console.log(decoded);

                  res.json({
                      success: true,
                      token: 'Bearer ' + token //used a Bearer token
                });
              }else{
                  errors.push({msg: 'wrong password'});
                  res.send(errors);
              }
          });

         
            
        })
        .catch(err => console.log('something went wrong, user not found'));
        //this line prevents unhandledd promise rejection warning
    
});



//status 200 == ok, but something was not created
//status 201 == ok, but something created
//status 204 == ok, but something deleted

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

 //UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

module.exports = router;

