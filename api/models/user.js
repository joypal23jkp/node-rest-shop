const { Schema, model } = require('mongoose');

const userSchema = Schema({
    email: { 
            type : String,
            require: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/  
        },
    password: { type : String, require: true }
}, {strict: false})

module.exports = model('User', userSchema);