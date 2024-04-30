const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
    productBanner:[{
        banner:{
            type:String,
            require:true
        }
    }],
    bannerText:{
        type:String
    }
})

module.exports = mongoose.model('Banners',BannerSchema);