/*
when user logs in, a token is issued to him. That token will be sent 
in the header for every page he tries to
access. The token will be verified and the id in it will be decoded. 
the system then finds the user with that id and 
grants access if verified.
*/
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Items = require('../models/ReminderList');
const passport = require('passport');


// @route:  POST items/create/:id
// @description: create new reminder item
// @access: private
/*
the id here is the user id which can be obtained once the user
 is logged in and verified, it will be passed as a parameter
into the url
*/
//jwt below indicates jwt json web token strategy is used -- there other ones available in passport
//passport.authenticate protects the route from unauthorised user
router.post('/create/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { title, details, remindMeBy } = req.body;

    if(!req.is('application/json')){
        return res.status(400).json({msg: 'only json allowed'});
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
        res.status(400).send(errors);
    } else {
         //find the user that created the reminder item, and save his namae with the records
    User.findOne({_id: userId }).then(user => {
        if(!user){ 
           errors.push({msg: 'Sorry, you need to login to access this feature'});
           res.status(400).send(errors);
        } else {
           
            const newItems = new Items({
                createdBy: user.firstname,
                creatorId: user._id,
                creatorEmail: user.email,
                creatorPhoneNumber: user.phone,
                title,
                details,
                remindMeBy    
            });

              newItems.save()
                .then(res.status(200).json({msg: 'Reminder created successfully'}))
                .catch(err => console.log(err)); 
        }
    })
    }  
});

// @route:  GET items/fetch/:id
// @description: get all items created by a particular user
// @access: private
/*
the user id is also used here as above. here all items saved by the user are retrieved
*/

router.get('/fetch/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    
    const userId = req.params.id;
    try {
        //const userItems = await Items.findById({creatorId: req.params.id}); didn't work
        const userItems = await Items.find().where('creatorId').equals(userId);
        //where creatorId matches req.params.id
        res.json(userItems);
    } catch (error) {
        res.status(400).json({msg: 'No item found'});
    }
});


// @route:  get items/fetch/:id
// @description: get single items 
// @access: private
/*
when all items saved by user are retrieved, the id for each post will become available.
you can use console.log() to see the json response when all items are retrieved as above.
reference can now be made to the id for each item, and it is then used as the query string for this api call
*/
router.get('/fetch_item/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    
    const itemId = req.params.id;
    try {
        const item = await Items.findById({_id: itemId});
        res.json(item);
    } catch (error) {
        res.status(400).json({msg: 'No item found'});
    }
});

// @route:  Put items/fetch_item/:id
// @description: update single item
// @access: private
/*
the item id is used as the query string for this api call
*/

router.put('/fetch_item/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //check if data is json type
    if(!req.is('application/json')){
       return res.json({msg: 'Only json format is supported'});
    }

    const itemId = req.params.id;
    try {
        //const updateItem = await Items.findByIdAndUpdate did not work
        const updateItem = await Items.findOneAndUpdate({_id: itemId}, req.body, {new: true});
        res.status(200).json({msg: 'Item updated successfully'});//ok 
    } catch (error) {
        res.status(400).json({msg: 'Update failed, try again'});
    }
});


// @route:  DELETE items/delete_item/:id
// @description: delete single item from db
// @access: private
/*
item id is used as the query parameter for this api call
*/

router.delete('/delete_item/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    
    try {
        const deleteItem = await Items.findOneAndRemove({_id: req.params.id}); 
        //where creatorId matches req.params.id
        res.json({msg: 'Item deleted successfully'});
    } catch (error) {
        res.json({msg: 'Update failed, try again'});
    }
});


module.exports = router;

