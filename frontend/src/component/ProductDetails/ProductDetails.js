import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductsDetailsAction , createNewProductReviewAction} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js'
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata/Metadata";
import { addToCartAction } from "../../actions/cartActions";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const ProductDetails = () => {
  const alert = useAlert()

  const { loading, error, product } = useSelector((state) => state.product);
  const { isAuthenticated, loading:userLoading, error:userEroor , user} = useSelector((state) => state.user);
  const { loading:reviewLoading, error:reviewError,reviews , success} = useSelector((state) => state.newReview);

  const dispatch = useDispatch();
  const { id } = useParams();

const [rating, setRating] = useState(Number()| null)
const [textfiledData, settextfiledData] = useState("")
const [ratingStar, setratingStar] = useState(0)



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   setratingStar(product.ratings)
// console.log("ranng stat --", ratingStar)



  const options = {
    edit: false,
    activeColor: "tomato",
    color: "rgba(20,20,20,0.1)",
    // value:Number(product.ratings),
    // value:Number(star),

    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  const options2 = {
    precision:0.5,
    // value:ratingStar,
    size:"large", 
    readOnly:true
  }
const [quantity, setquantity] = useState(1)

  const decreaseQuantity =()=>{
    if (1>= quantity )return  
    const qty = quantity-1
    setquantity(qty)
  }
  const increaseQuantity =()=>{
    if(product.stock < quantity+1) return ;
    const qty = quantity+1
    setquantity(qty)
  }
 

const addToCartHandler =()=>{
  dispatch(addToCartAction(id, quantity))
}


var dataIntextField
const commentEnterSubmit = (e) => {
  // if (e.key === "Enter" && e.shiftKey == false) {
  //   const data = {content:e.target.value};
  //   return handleSubmit(CommentOnSubmit(data));

  // }
  settextfiledData(e.target.value)
  // console.log("textfiledData textfied--- productdetiasl---" ,textfiledData )

}
const submitTheReview =(e)=>{
  let formData = new FormData();

    formData.append("comment", textfiledData);
    // formData.append("user", user?._id);
    // formData.append("name", user?.name);
    formData.append("rating", rating);
    formData.append("productId", product._id);


  //  console.log("formdata in product detoals.js--", formData)
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }
     dispatch(createNewProductReviewAction(formData))
  setOpen(false);
}

  // const CommentOnSubmit = (dataIntextField) => {
  //   let formData = new FormData();

  //   formData.append("content", dataIntextField);
  //   formData.append("user", user?.id);

    
  // };


  function createMarkup2() {
    // return {
      // __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    // };
    return {__html:`${product.description}`}
   
    // return {__html:`<p>sadf<span style="color: rgb(26,188,156);">ddfd and </span><span style="color: rgb(243,121,52);">that istdfddd<sup>3999</sup></span></p>`}
  }


  useEffect(() => {

    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    dispatch(getProductsDetailsAction(id));

    if(reviewError){
      alert.error(reviewError)
      dispatch({type:NEW_REVIEW_RESET})
  }
  if(success){
    alert.success("review added successfully")
  }

  }, [id, dispatch,error, alert, reviewError,success,reviews]);



  // console.log("id in forntend productdetials", id);
  // console.log("prodcut in forntend productdetials", product);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"ECOM "+product.name}/>

          <div className="productDetails">
            <div className="carotop">
              <Carousel>
                {product.images &&
                  product.images.map((item, index) => (
                    <img
                      className="Carouselimage"
                      key={item.url}
                      src={item.url}
                      alt={`${index} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="secondsection">
             
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>{product._id}</p>
            </div>
            <div className="detailsBlock-2">
              {/* <ReactStars {...options} value={product.ratings} /> */}
    {/* <Rating  {...options2} value={Number(ratingStar)}/> */}
    <Rating  {...options2} value={product.ratings}/>

              <span>({product.numOfReviews} reviews) </span>
            </div>
            <div className="detailsBlock-3">
              <h1>Price : {" "}{product.price}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input type="number" value={quantity} readOnly/>
                  <button onClick={increaseQuantity}>+</button>
                </div>{" "}
                <button className="addtoCartButton"  disabled={product.stock<1?true:false} onClick={addToCartHandler}>Add to cart</button>
              </div>
              <p>
                Status{" "}
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "Out of Stock" : " InStock"}{" "}
                </b>
              </p>
            </div>
              <div className="detailsBlock-4">
                {/* Description : <p>{product.description}</p>  <div dangerouslySetInnerHTML={createMarkup()} /> */}
                Description : <div><div dangerouslySetInnerHTML={createMarkup2()} /></div>  

              </div>
               
               {/* <button className="submitReview" > Submit Review</button> */}
               <Button 
                sx={{background:"tomato", margin:"1vmax" , color:"white",  '&:hover':{background:"green"}}} 
                className="submitReview"  variant="outlined" onClick={handleClickOpen}>
           SubmitReview
      </Button>
      <Dialog open={open} onClose={handleClose} 
      // sx={{color:"white"}}
      className="zzzzzzzzzzzzz"
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent >
          <DialogContentText>
          Please Submit your Review for {product.name}
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Submit Review"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
          <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
           <TextareaAutosize
           name="textareaForSubmitReview"
      aria-label="empty textarea"
      placeholder="write your review here"
      onKeyPress={ commentEnterSubmit}
      sx={{background:"blue", }}
      style={{ width: 200, color:"black" }}
    />
          </Box>
    
        </DialogContent>
        <DialogActions>
          <Button sx={{bgcolor:"red", color:"white"}} onClick={handleClose}>Cancel</Button>
          <Button sx={{bgcolor:"limeGreen", color:"white"}}  onClick={submitTheReview}>Submit</Button>
        </DialogActions>
      </Dialog>
              </div>
          </div>
     <h3 className="reveiewsHeading"> REVIEWS</h3>
     {product.reviews && product.reviews[0]?(
      <div className="reviews">
        {product.reviews && product.reviews.map((review)=> <ReviewCard key={review._id} review ={review}/>)}
      </div>
     ):( 
      <p className="noReviews">No Reviews yet</p>
     )}
             
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
