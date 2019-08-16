const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    //data refers to req.body, this 
    //function will be used in users.js to validate login input

    //empty errors identifier
    let errors = {};

    //init email and password fields set to entered value or empty string
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
        errors.firstname = 'Name must be between 2 and 30 characters';
      }
    
      if (Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Name field is required';
      }
    
      if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
      }
    
      if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
      }

      if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number is required';
      }
    
      if (!Validator.isNumeric(data.phone)) {
        errors.phone = 'Only digits are allowed';
      }

      if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
      }
    
      if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
      }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};