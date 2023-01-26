import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "./Products.css";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getProducts,
  getProductsDetailsAction,
} from "../../actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../layout/ProductCard/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import Metadata from "../layout/Metadata/Metadata";


const categories =[
  "camera", 
  "judo",
  "webcam",
  "sample",
  "guns", 
  "roses"
]


const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { keyword } = useParams();


  const {
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    loading,
  } = useSelector((state) => state.products);
  let count = filteredProductsCount
  // console.log("filteredProductsCount=="+filteredProductsCount)

  const [currentpage, setCurrentpage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  const setCurrentPageInfo = (e) => {
    setCurrentpage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  function valueText(value) {
    return `${value}°C`;
  }

  // console.log("productsCount in product.js--" + productsCount);
  //   console.log("keywoed in product .js", keyword)
  // console.log("product in foned product" , products)
  let dummyCOunt = productsCount ? productsCount : 0;

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProducts(keyword, currentpage, price,category,ratings));
  }, [dispatch, keyword, currentpage, price,category, ratings]);

  // console.log("laoding in foned product" , loading)
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"ECOM"}/>
          <h2 className="productsHeading">PRODUCTS</h2>

          <div className="allProducts">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
      <div className="filterbox">
        <Typography>Price</Typography>

        <Slider
          getAriaLabel={() => "Temperature range"}
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          min={0}
          max={25000}
        />
        <Typography sx={{fontSize:"1.5vmax"}}>
          {price[0]} to {price[1]}{" "}
        </Typography>
        <Typography>Categories </Typography>
        <ul className="categoryBox">
          {categories.map((category)=>(
            <li className="categoryLink"
            key={category}
            onClick={()=>setCategory(category)}
            >
             {category}

            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
          value={ratings}
          onChange={(e,newRatings)=>{
            setRatings(newRatings)
          }}
          valueLabelDisplay="auto"
          
          min={0}
          max={5}



          />


        </fieldset>


      </div>

      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentpage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={count}
            pageRangeDisplayed={2}
            onChange={setCurrentPageInfo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
