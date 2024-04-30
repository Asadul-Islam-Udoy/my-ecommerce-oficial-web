const app = require('./app')
const colors = require('colors')
const DBconnection = require('./db.js')


DBconnection()

app.use((req,res,next)=>{
    res.send("<h1>404</h1>")
})

app.use((err,req,res,next)=>{
    if(res.header){
        next(err)
    }
    else{
        if(err.message){
            res.send(err.message)
        }
        else{
            res.send('somthing is wrong!')
        }
    }
})
app.get('',(req,res)=>{
    res.send('<h1>Hello Wrold</h1>')
    
})
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server port is running http://127.0.0.1:${PORT}`.bgBlue)
})




