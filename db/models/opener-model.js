const mongoose = require('mongoose');

const Opener = new mongoose.Schema({
    isPublished: {
        type: Boolean,
        default: false,
    },
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
    alias:{
        type:String,
        minlength:1,
        required:false,
        default:'annonymous',
    },
    upVotes:{
        type:[String],
        required:false,
    },
    downVotes:{
        type:[String],
        required:false,
    },
    updated: { 
        type: Date, 
        default: Date.now 
    }
});


module.exports = mongoose.model('Opener', Opener);