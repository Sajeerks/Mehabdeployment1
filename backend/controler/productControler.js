const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatuers = require("../utils/apiFeatuers");
const cloudinary = require("cloudinary");
// const { uuid } = require('uuidv4');
const momment = require("moment")



//update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorHander(`product with id:${req.params.id} not found`, 404)
    );
  }
  
  let oldImagesArray = product.images

  console.log("req.body in updateProduct in productcontroller===", req.body)
  let {images} = req.body
  console.log("images in backend===", images)

  let {newImages} = req.body
  let newImagesaddressArray = []
   let newImagesHelperArray=[]

  if(!Array.isArray(newImages)){
    newImagesHelperArray.push(newImages)
    newImages = newImagesHelperArray
  }
if (newImages.length>0){

  try {

    // let images = [...req.body.images];
  
    //  console.log("hereeeeeeeeee")
    for (let i =0; i < newImages.length;  i++){
          const result = await cloudinary.v2.uploader.upload(newImages[i], {
            // chunk_size : 5000000,
          folder: "products",
           width: 250,
          crop: "scale"
    });
    
     console.log("reseult---", result)
     newImagesaddressArray.push({
        public_id: result.public_id,
        url: result.secure_url
      })

    }

} catch (error) {
    console.log("error in editproduct--",error );
    // next(error);
    
}







}






const {imagesToDestroy} = req.body

  // console.log("imagesToDestroy===", imagesToDestroy)


  if(images){

    let changesImages =[]
    if(!Array.isArray(images)){
       changesImages.push(images)
    // console.log("changesImages in createBanner--after x",changesImages )
    
       images = changesImages
    }


    // for (let index = 0; index < images.length; index++) {
   
    //   console.log(`${index}--`, images[index])
    //   console.log(`${index}--`, JSON.parse(images[index]))
    //   console.log(`${index}--`, JSON.parse(images[index]).public_id)
      
    // }
    
  }



  if (imagesToDestroy !== undefined) {


    try {
      await cloudinary.v2.uploader.destroy(imagesToDestroy);
      console.log("image deleted from cloudinary000000000")
      
    } catch (error) {
      console.log("error in edit product conrriller",error)
    }
  
    // Deleting Images From Cloudinary
  //   for (let i = 0; i < product.images.length; i++) {
      
  //     // await cloudinary.v2.uploader.destroy(product.images[i].public_id);
   

  // console.log("imagesToDestroy===", imagesToDestroy)

  //   }

    //  console.log("images:JSON.parse(images)---",JSON.parse(images))
    console.log("images before parsing--", images)

    // images = JSON.parse(...images)
    let parsedArray  = images.map((image)=> JSON.parse(image))

    console.log("images after parsing--", parsedArray)

    let filteredImages222 = parsedArray.filter((image)=>image.public_id!==imagesToDestroy )
    console.log("filteredImages222--",filteredImages222)

  product = await Product.updateOne({_id:req.params.id},
    
    
    // req.body,
    // {images:filteredImages222},
    {$set: {"images":filteredImages222  } },
    
    {
    new: true,
    // runValidators: true,
    // useFindandModify: false,
  });
   } else if(newImagesaddressArray.length>0) {

   let combinedImagesArray = [...oldImagesArray, ...newImagesaddressArray]



   product = await Product.updateOne({_id:req.params.id},
      

    {$set: {
      "name": req.body.name,
      "stock": req.body.stock,
      "price": req.body.price,
      "createdAt": new Date(momment(req.body.createdAt ).format("YYYY-MM-DD")),
      "category": req.body.category,
      "description": req.body.description,
      "images":combinedImagesArray

           
           
        
  } },
    
    {
      multi: true

  }
      )
   


   }
  
  else{



    product = await Product.updateOne({_id:req.params.id},
      

    {$set: {
      "name": req.body.name,
      "stock": req.body.stock,
      "price": req.body.price,
      "createdAt": new Date(momment(req.body.createdAt ).format("YYYY-MM-DD")),
      "category": req.body.category,
      "description": req.body.description,

           
           
        
  } },
    
    {
      multi: true

  }
      )

  }





product = await Product.findById(req.params.id)


console.log("after product ---------", product)




  res.status(200).json({
    success: true,
    product,
  });
});



















//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  //console.log("req.user", req.user)
  // console.log("req.body in createproduct", req.body)


 const  { name, description, price, category,stock } = req.body
 
let {images} = req.body

  // const { name, description, price, category,stock , } = product
  // console.log("product in createproduct", product)
  const imagesArray = []

  

  // console.log("images in createBanner--",images )
  // console.log("images.length in createBanner--",images.length )
  // console.log("typeof  in images--",typeof images )

  // console.log(" Array.isArray(images).typeof in createBanner--", Array.isArray(images) )
  // console.log("Object.prototype.toString.call(images)",Object.prototype.toString.call(images))  //"[object Object]" if myVar is an object   "[object Array]" if myVar is an array
  // console.log("Object.prototype.toString.call(req.body)",Object.prototype.toString.call(req.body))  //"[object Object]" if myVar is an object   "[object Array]" if myVar is an array

let changesImages =[]
if(!Array.isArray(images)){
   changesImages.push(images)
// console.log("changesImages in createBanner--after x",changesImages )

   images = changesImages
}

// console.log("images in createBanner--after ",images )
console.log("images.length in createBanner--after",images.length )
// console.log(" Array.isArray(images).typeof in createBanner--after", Array.isArray(images) )






  // let images = [...req.body.images];
  // console.log("images--", images)
  let imagesBuffer = [];
  try {

    // let images = [...req.body.images];
  
    //  console.log("hereeeeeeeeee")
    for (let i =0; i < images.length;  i++){
          const result = await cloudinary.v2.uploader.upload(images[i], {
            // chunk_size : 5000000,
          folder: "products",
        width: 250,
          crop: "scale"
    });
    
     console.log("reseult---", result)
      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url
      })

    }



    // req.body.images = imagesBuffer
    //  const banner = await Banner.create(req.body)
     
    // res.status(201).json({
    //     success: true,
    //     banner
    // })
    
} catch (error) {
    console.log("error in creatprocduct--",error );
    // next(error);
    
}















  // const {images} = req.body;
  // const uploadedImgs = images.map(async image=>{
  //  const upload =  await cloudinary.uploader.v2.upload(image,
  //       { 
  //         upload_preset: 'unsigned_upload',
  //         allowed_formats : ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
  //     }, 
  //       function(error, result) {
  //           if(error){
  //               console.log(error)
  //           }
  //            });
  //   return upload
  // })

  // try{
  //   const fulfilled = await Promise.all(uploadedImgs).then(values=> {return values})
  //   const publicIds =  fulfilled.map(image=>{
  //       return image.public_id
  //   })
  //   console.log("publicIds from createproduct --",publicIds)
  //   // res.status(200).json(publicIds)
  // }catch(err){
  //   // res.status(500).json(err)
  //   console.log("err from create product--" , err)
  // }
    
















//   const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
//     folder: "products",
//     width: 150,
//     crop: "scale",
//   });
// console.log("images-----", images)
//   imagesArray.push(  {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       })

// console.log("imagesArray ---- priro" ,imagesArray)



// const promises = images.map((img) => {
//   const imageid = uuidv4();

//    return cloudinary.v2.uploader.upload(
//             img,
//             {
//                 folder: products,
//                 resource_type: "image",
//                 width: 150,
//                   crop: "scale",
//                 public_id: imageid,
//             }).then((result) => {
//                 console.log("*** Success: Cloudinary Upload: ", result.url);
//                 imagesArray.push({ imageid: imageid, url: result.url });
//             }).catch((err) => {
//                 console.log("*** Error: Cloudinary Upload");
//             });
// });

// await Promise.all(promises);






// console.log("finshed pringint out")
// console.log("imgaes length ===",images.length)




// console.log("images array ---", imagesArray)
//   const imagesToCloudinary = images.map ( data => {
//     // missing return statement
//      return cloudinary.v2.uploader.upload(data.path)
//  });
 
//  let imageResponses = await Promise.all(imagesToCloudinary);
 
//  console.log(imageResponses);






  
  // console.log("req.body in create product --" , req.body)


   
// for (let index = 0; index < imageFiles.length; index++) {
//   console.log(`imgesfile${index}==`,imageFiles[index])
// }

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   avatar: {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   },
  // });

  console.log("imgage buffer", imagesBuffer)
req.body.user = req.user._id;
user =req.user._id;
const rawProduct = {
name, description, price, category,stock,
user,

images:imagesBuffer ,

}
console.log("product at the very end ", rawProduct)


const product = await Product.create(rawProduct);


  res.status(201).json({
    success: true,
    product,
  });
});

//get all products  ADMIN
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // const products = await Product.find();
  // return next(new ErrorHander("this is new errror ", 404))
  const resultPerPage = 4;
  const productsCount = await Product.countDocuments();
  const productInstock = await Product.find({stock:{ $gt: 0 }})


  const apifeatures = new ApiFeatuers(Product.find(), req.query)
    .search()
    .filter()
    // .pagination(resultPerPage)
   
let products = await apifeatures.query
let filteredProductsCount = products.length

//  console.log("producsts in product controller ,products.length ",products.length )

apifeatures.pagination(resultPerPage)

   products = await apifeatures.query.clone(); 
  // console.log("products",products)

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    productInstock,
  });
});






exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: `product not found with id ${req.params.id}`,
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: `product  with   id ${req.params.id} is deleted successfully`,
  });
});

exports.getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorHander(`product with id:${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// create new review or update the reviw
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    comment: comment,
    rating: Number(rating),
  };

  // console.log("reqviw in createproductReview", review)
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = Number(product.reviews.length);
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

//get all proucts for admin requst for 
exports.getAllProductsListForAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()
  if (!products) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    products
  });
});









//get all revies for single product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete revives
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = Number(reviews.length);
  let avg = 0;

  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  const ratings = avg / reviews.length || 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews,
  });
});
