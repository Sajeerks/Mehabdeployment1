const app = require('./app')
const dotenv = require('dotenv')
const connect_database = require("./config/database")
const cloudinary = require("cloudinary")

// const PORT = process.env.PORT || 4000
const PORT =  4000


//config
dotenv.config({path:'backend/config/config.env'})
//connnecting to database
connect_database()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME    , 
    api_key: process.env.CLOUDINARY_API_KEY    ,
    api_secret: process.env.CLOUDINARY_SECRET    ,
})




// handling uncauage expection 
process.on("uncaughtException", err=>{
    console.log(`uncaughtException`, err.message)
    console.log("server is shutting down  due to uncaughtException " )
    process.exit(1)

})






// const server = 
app.listen(PORT, ()=>{
    // console.log(`sever is working sss on http://localhost:${process.env.PORT}`)
    // try {
    console.log(`sever is working sss on http://localhost:${PORT}`)
        
    // } catch (error) {
        //   console.log("error while running the server --", error);
    // }

})
// process.on("unhandledRejection", err=>{
//     console.log(`error ${err.message}`)
//     console.log("server is shutting down  due to unhandled server rejection " )
//     server.close(()=>{
//         process.exit(1)
//     })
// })