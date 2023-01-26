import React from "react";
import "./FeaturedLama.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FeaturedLama = () => {
  const percentage = 66;
  return (
    <div className="featherirelama">
      <div className="toatlrevenueheading">
        {" "}
        <h2 title="show the total Revene of the compnay for the set period"> Total Revenue</h2>
      </div>
      <div  className="progesscompoment">
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
      <div className="FeaturedLamaInLastcoklu">
        <marquee direction="up" height="100%" scrollamount="1">
            <p>Total Sales is 2514</p>
            <p>Total Customers visited is 48</p>
            <p>Total profit is 254</p>

        </marquee>
      </div>
    </div>
  );
};

export default FeaturedLama;
