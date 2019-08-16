const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    //data refers to req.body, this 
    //function will be used in users.js to validate login input

    //empty errors identifier
    let errors = {};

    //init email and password fields set to entered value or empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Invalid email'
    }
    //validate input
    if(Validator.isEmpty(data.email)){
        //add a new key value pair to the empty errors object
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};