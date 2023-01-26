const mongoose  = require("mongoose")


  const connect_database = ()=>{
      mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }).then(data=>{
      console.log(`mongo DB connected with server :${data.connection.host}` )
  }).catch((err)=>{
      console.log(err)
  })
  }
  module.exports =connect_database