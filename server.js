const dotenv=require('dotenv')
dotenv.config()
const express = require("express")
const mongoose =require ('mongoose')
const router = require ('./poemRouter/router.js')
 


const app = express()

app.use(express.json())
app.use('/api/v1',router)
 
app.get('/api/v1',(req,res)=>{
    res.send("Welcome to Peom API")
})


const port = process.env.port
const db = process.env.dblink


mongoose.connect(db).then(()=>{
console.log("Database Connection is Succesful")
app.listen(port,()=>{
    console.log("server is listening to port: " + port)
})
}).catch((err)=>{
    console.log("Unable to connect to Database" + err)
})



