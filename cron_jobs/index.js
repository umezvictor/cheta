const cron = require('node-cron');

const task = cron.schedule('* * * * *', () => {
        console.log('Victor is in love with Precious');
 });
    
module.exports = task;

