const mongoose = require('mongoose');
const Schema= mongoose.Schema;
// create schema
const PostSchema = new Schema({
    title:{
        type : String,
        required: true, 
    },
    description:{
        type : String,
        required : true,
    }
});
module.exports = Post = mongoose.model('post',PostSchema);