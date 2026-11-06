const mongoose=require('mongoose')
const connection_string=process.env.DBConnectionString

mongoose.connect(connection_string).then((res)=>{
    console.log("Server connected to MongoDB");
}).catch((err)=>{
    console.log("Connection Failed");
    console.log(err); 
})