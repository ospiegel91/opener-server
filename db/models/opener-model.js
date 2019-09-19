const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const Opener = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        minlength:1,
        trim:false,
        unique:true,
    },
    genere:{
        type:String,
        minlength:3,
        required:false,
        default:'generic',
    },
    upVotes:{
        type:Number,
        required:false,
        default: 0,
    },
    downVotes:{
        type:Number,
        required:false,
        default: 0,
    },
    updated: { 
        type: Date, 
        default: Date.now 
    }
});


module.exports = mongoose.model('Opener', Opener);