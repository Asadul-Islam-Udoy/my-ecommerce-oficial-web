const mongoose = require('mongoose');

const OrderSchema=new mongoose.Schema({
    shippingInfo:{
      name:{
        type:String,
        required:true
      },
      address:{
       type:String,
       required:true
      },
      city:{
        type:String,
        required:true
      },
      state:{
        type:String
      },
      country:{
        type:String
      },
      mobile:{
        type:Number
      }
    },
    itemInfo:[{
      name:{
        type:String
      },
      quantity:{
        type:Number
      },
      productImage:{
        type:String
      },
      colors:[],
      sizes:[],
      height:{
        type:String
      },
      width:{
        type:String
      }
    }],
    orderInfo:{
        _id:{
            type:String
        },
        status:{
            type:String
        }
    },
    paidAt:{
        type:Date,
    },

    shippingPrice:{
        type:Number
    },
    taxPrice:{
        type:Number
    },   
    totalPrice:{
        type:Number
    },
    orderStatus:{
        type:String,
        default:'processing'
    },
    DelivaridAt:Date
},{timestamps:true})


module.exports = mongoose.model('Orders',OrderSchema)