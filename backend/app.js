const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const UserRouter = require('./routers/auth/UserRouter')
const ProductsRouter = require('./routers/products/ProductsRouter')
const CategoriRouter = require('./routers/category/CategoriRouter')
const OrderRouter = require('./routers/order/OrderRouter')
const BannerRouter = require('./routers/banners/BannersRouter')
const path = require('path')
const cors = require('cors')
const app = express()
dotenv.config({path:'backend/.env'});
app.use('/images', express.static(path.join(__dirname, './public/images')));
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/v1/user',UserRouter)
app.use('/api/v1/products',ProductsRouter)
app.use('/api/v1/category',CategoriRouter)
app.use('/api/v1/orders',OrderRouter)
app.use('/api/v1/banner',BannerRouter)

app.use(express.static(path.join(__dirname,'../frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
})
module.exports = app

