const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        tirm:true,
    },
    email:{
        type:String,
        unique:[true,'email address is unique'],
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        type:String,
        default:'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=626&ext=jpg&ga=GA1.1.1291529831.1679838217&semt=sph'
    },
    is_validated:{
     type:Boolean,
     default : false
    },
    role:{
     type:String,
     default:'user'
    },
    isOtp:String,
    isTimeExpress:Date
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
  this.password = await bcrypt.hash(this.password,10)
})

UserSchema.methods.GetUserToken = function(){
 return JWT.sign({_id:this._id},process.env.J_SECRIT_KEY,{expiresIn:'7d'}) 
}

UserSchema.methods.PasswordCompare= async function(newpassword){
   return await bcrypt.compare(newpassword,this.password)
}

UserSchema.methods.GetRendomNumber=function(){
 const randomNumber = crypto.randomBytes(2).toString("hex").toLocaleUpperCase();
 return randomNumber
}

module.exports = mongoose.model('Users',UserSchema)