import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import "./Search.css";
import { useDispatch } from "react-redux";
import Metadata from "../layout/Metadata/Metadata";



const Search = () => {
  const navigate = useNavigate();

   const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
//  console.log("keywod in serach.js---", keyword)
  return (
    <Fragment>
          <Metadata title={"Search ECOM"}/>

      <form className="SearchBox" onSubmit={searchSubmitHandler}>
        <input
        className="searchInput"
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" className="searchBtn" />
      </form>
    </Fragment>
  );
};

export default Search;
