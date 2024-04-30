const mongoose = require('mongoose');

const CategoriSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
     type:String,
     unique:true
    },
    parentId:{
       type:String  
    } ,
    parentName:{
        type:String
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
    homeCategry:{
        type:Boolean,
        default:false
    } 
},{timestamps:true});

module.exports = mongoose.model("Categories",CategoriSchema)