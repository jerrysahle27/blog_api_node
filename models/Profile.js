const mongoose = require('mongoose');
const Schema= mongoose.Schema;
// create schema
const ProfileSchema = new Schema({
    user:{
        type : Schema.Types.ObjectId,
        ref: 'users'
    },
    handle:{
        type : String,
        max : 40
    },
    company:{
        type:String,
    },
    location:{
        type:String,
    },
    skill:{
        type:[],
        required:true,
    },
    website:{
       type:String,
    },
    bio:{
        type:String,
    },
    status:{
        type:String,
        required:true
    },
    githubusername:{
        type:String,
    },
    experience:[
        {
            title: {
                type:String,
            },
            company:{
                type:String,
             },
            location:{
                 type:String,
             },
            from:{
               type:Date,
            },
            to:{
                type:Date,
            },
            current:{
               type:Boolean,
               default:false
            }
        }
    ],
    
    Education:[
        {
            title: {
                type:String,
            },
            School:{
                type:String,
             },
            degree:{
               type:String,
             },
            fieldofstudy:{
               type:String,
            },
            location:{
                 type:String,
             },
            from:{
               type:Date,
            },
            to:{
                type:Date,
            },
            current:{
               type:Boolean,
               default:false
            }
        },
    ],
    Socialmedia : {
        Youtube : {
           type:String,
        },
        Facebook : {
            type:String,
        },
        Twitter : {
           type:String,
        },
        LinkedIn : {
           type:String,
        },
        Instagram : {
           type:String,
        }
    },

    date:{
        type : Date,
        default: Date.now
    },
});
module.exports = Profile = mongoose.model('profile',ProfileSchema);