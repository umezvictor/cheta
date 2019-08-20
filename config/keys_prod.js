//keys used in production environment
//environment variables will be loaded from server -- eg heroku
module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    SengridApiKey: process.env.SengridApiKey,
    JWT_SECRET: process.env.JWT_SECRET,
    NexmoApiKey: process.env.NexmoApiKey,
    NexmoSecretKey: process.env.NexmoSecretKey,
    publicVapidKey: process.env.publicVapidKey,
    privateVapidKey: process.env.privateVapidKey
};
