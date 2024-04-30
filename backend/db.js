const mongoose = require('mongoose')
const DBconnection =async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoose connection${conn.connection.host}`.bgCyan)
    }
    catch(error){
        console.log(error)
    }
   
}
module.exports = DBconnection