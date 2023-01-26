const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pleae enter  a Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Pleae enter  a description"],
  },
  price: {
    type: Number,
    required: [true, "Pleae enter  a price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
        default:"defaul public ID"
      },
      url: {
        type: String,
        required: true,
        default:"defaul publicr URL"
      },
    },
  ],
  category:{
      type:String,
      required:[true, 'please enter the category']
  },
  stock:{
    type:Number,
    required:[true, 'please enter the stock'],
    maxLength:[4,"stock cannot 4 chaaracters"], 
    default:1
  },
  numOfReviews:{
      type:Number,
      default:0,
  },
  reviews:[
      {
        user: {
          type:mongoose.Schema.ObjectId,
          ref:"User",
          required:true
        },
          name:{
              type:String, 
              required:true
          },
          rating:{
              type:Number,
              required:true
          },
          comment:{
            type:String, 
          
        },
      }
  ], 
  user: {
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  createdAt:{
      type:Date, 
      default:Date.now
  }
});

module.exports = mongoose.model("Product", productSchema)
