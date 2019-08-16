//load keys based on environment
//if in production environment
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys_prod');
}else{
    //if in development environment
    module.exports = require('./keys_dev');
}

