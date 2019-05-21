const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetTokenExpires: {
        type: Date,
        default: null
    },
    joined: {
        type: Date,
        default: Date.now()
    },
    activated: {
        type: Boolean,
        default: false
    },
    activateToken: {
        type: String,
        default: null
    }
});
//either works

const User = mongoose.model('User', UserSchema);
module.exports = User;

// module.exports = User = mongoose.model('User', UserSchema);
