const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require('dotenv')

const app = express();
const errorMiddleware = require("./middleware/error.js")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
dotenv.config({path:'backend/config/config.env'})
const path = require("path")


app.use(express.json({ limit: "50mb" }));
 app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())



//route imports
const productRoute = require("./routes/productRoutes")
const userRoute = require("./routes/userRoutes")
const orderRoute = require("./routes/orderRoute")
const paymentRoute = require("./routes/paymentRoute")






app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', orderRoute)
app.use('/api/v1', paymentRoute)




//after npm run build
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html" ))
})
///////


app.use(errorMiddleware)

module.exports = app;
