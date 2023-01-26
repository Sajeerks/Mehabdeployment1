import React, { Fragment } from 'react'
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import profilepPng from '../../images/Profile.png'
import "./ReviewCard.css"

const ReviewCard = ({review}) => {
   const {user} = useSelector(state=>state.user)
    const options = {
        edit: false,
        activeColor: "tomato",
        color: "rgba(20,20,20,0.1)",
         value:review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
      };

  return (
     <Fragment>
        <div className="reviewCard">
        <img src={profilepPng} alt="User"/>
        <ReactStars {...options}/>
         <p>{review.comment}</p>
         
        </div>
      

     </Fragment>
  )
}

export default ReviewCard