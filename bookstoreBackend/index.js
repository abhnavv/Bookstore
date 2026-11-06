//import  all packages
//loads .env file contents into process.env
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/routes')
//importing the db.js for running the db connection automatically when loading index.js

require('./config/db')


//create server using express package
const server=express()
//enable cors in server
server.use(cors())

//parse json to json content-middleware
server.use(express.json())

//use the router registration
server.use(router)

// set the sttatic pat response on server
server.use('/uploads',express.static('./uploads'))
//set up port number to run server in internet (initilizing the PORT on env file by process.env method)

let PORT=process.env.PORT
//start server  to listen client request to that port
server.listen(PORT,()=>{
    console.log("Server running and waiting for client request..");
})

// handle global error in server using application middleware logic(application specific middleware)
server.use((err,req,res,next)=>{
    res.status(500).json(err.message)
}) 

// resolve api(get request to http://localhost/3000/) using express
server.get('/',(req,res)=>{
    res.status(200).send(`<h1>Server running and waiting for client request</h1>`)
})

server.post('/',(req,res)=>{
    res.status(200).send("POST REQUEST")
})

