const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatuers = require("../utils/apiFeatuers");
const Order = require("../models/orderModels");


//crate new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  console.log("req.params.id in getsingleOrder",req.params.id)
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHander(`order not found with this id :${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get login user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  console.log("req,user._id ====", req.user._id);

  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(
      new ErrorHander(`order not found with this id :${req.user._id}`)
    );
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//get alll  user orders adlim
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(
      new ErrorHander(`order not found with this id :${req.user._id}`)
    );
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});



// update order 
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(
        new ErrorHander(`order not found with this id :${req.params._id}`)
      );
    }
  
if(order.orderStatus === "Delivered"){

    return next(new ErrorHander("you have already delivered this product" , 404) )
}
  order.orderItems.forEach(async (order)=>{
    await updateStock(order.product, order.quantity)
  })

 order.orderStatus = req.body.status
   if(req.body.status === "Delivered"){
 order.deliveredAt = Date.now()
   }
 

 await order.save({validateBeforeSave:false})
  
    res.status(200).json({
      success: true,
      order,
      
    });
  });




  //delete orders adlim
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(
        new ErrorHander(`order not found with this id :${req.user._id}`)
      );
    }
  
   await order.remove()
  
    res.status(200).json({
      success: true,
      message:`order with id: ${req.params.id} was deleted`
     
    });
  });



























  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    // console.log("qantitye in upate stock" , quantity)
    if(!product){
        console.log(`product with id: ${id } not found `)
        // return next( new ErrorHander(`product with id: ${id } not found `, 404))
    }
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
