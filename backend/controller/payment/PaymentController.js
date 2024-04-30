const asyncHandler = require('express-async-handler')
const stripe = require('stripe')('sk_test_51O3fZBIqVM6rcM5vlfInaaxJbJhjHbkvdnZRyRAlVZTMY7mX0ddkSxucRi2erzU81sxpecmiQzVLuf9aWb3Yb3Ao00wKmJ13Lp')
exports.PaymentController=asyncHandler(async(req,res)=>{
    const total = req.body.amount;
    const result = await stripe.paymentIntents.create({
        amount:total,
        currency:'inr',
        metadata:{
            company:'ecommerce'
        }
    })
       res.status(200).json({
        success:true,
        message:'payment successfully',
        clientSecret:result.client_secret
    })

})

exports.GetApiKEY=asyncHandler(async(req,res)=>{
       res.status(200).json({
        paymentApiKey:process.env.API_SECRIT_KEY
    })
})