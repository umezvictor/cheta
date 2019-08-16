const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorEmail: {
        type: String,
        required: true
    },
    creatorPhoneNumber: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        default: ''
    },
    remindMeBy: {
        type: Date,
        required: true
    },
    completed: {
        type: String,
        default: 'pending'
    }
});
//either works

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;

// module.exports = User = mongoose.model('User', UserSchema);
