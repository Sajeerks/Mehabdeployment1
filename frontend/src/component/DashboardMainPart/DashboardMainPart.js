import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";
import Metadata from "../layout/Metadata/Metadata";
import Loader from "../Loader/Loader";
import "./DashboardMainPart.css";

import { Doughnut, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
// import ChartJS from 'chart.js'
import ChartJS from "chart.js/auto"; /// important otherwise will throw werror
import { clearErrors, getAllOrdersAction } from "../../actions/orderActions";
import {
  clearErrors as userClearError,
  allUsersAction,
} from "../../actions/userActions";

import { useAlert } from "react-alert";
import { getProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale);

const DashboardMainPart = () => {
  const { loading, user, error } = useSelector((state) => state.user);
  const {
    loading: orderLoading,
    orders,
    error: orderError,
  } = useSelector((state) => state.allOrders);
  const {
    loading: productLoading,
    products,
    error: productError,
    productInstock,
    productsCount,
  } = useSelector((state) => state.products);
  const {
    loading: allUserLoading,
    users,
    error: allUserError,
  } = useSelector((state) => state.allUsers);

  const productOUtofStock =
    productInstock && productsCount - productInstock.length;

  let result = 0;
  const noOFOrderShipped = orders.reduce(function (
    previousValue,
    currentValue,
    currentIndex
  ) {
    if (orders[currentIndex].orderStatus === "shipped") {
      result++;
    }
    return result;
  },
  0);

  const totalMountOfOrders = orders.reduce(function (
    previousValue,
    currentValue,
    currentIndex
  ) {
    return previousValue + currentValue.totalPrice;
  },
  0);

  //  console.log("noOFOrderShipped====",noOFOrderShipped)
  //  console.log("totalMountOfOrders====",totalMountOfOrders)

  // console.log("DashboardMainPart==users==", users)

  const dispatch = useDispatch();
  const alert = useAlert();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var data1 =
    orders &&
    orders.map((order, index) => {
      const totalForThatMonth = 0;
      for (let k = 0; k < 11; k++) {
        if (new Date(order.createdAt).getMonth() === k)
          return {
            month: k,
            totalForThatMonth: totalForThatMonth + order.totalPrice,
          };
      }

      //   return ( month.map((singlemonth, Kindex)=>{
      //     console.log("new Date(order.createdAt).getMonth()--",new Date(order.createdAt).getMonth());
      //     console.log("singlemonth-idnex-",month.indexOf(singlemonth))
      //     console.log(new Date(order.createdAt).getMonth() === month.indexOf[singlemonth])
      //      return  ( new Date(order.createdAt).getMonth() === Kindex?new Date(order.createdAt).getMonth():0)
      //     }))

      // new Date(order.createdAt).getMonth()  !== month[index]?   new Date(order.createdAt):0
    });
  let reducedData = [];
  let arrayOfMonths = [];

  for (let k = 0; k < data1.length; k++) {
    //  console.log("   data1[k].month==",    data1[k].month)
    arrayOfMonths.push(data1[k].month);
  }
  const setOfMonths = new Set(arrayOfMonths);
  const filteredArrayOfMonths = Array.from(setOfMonths);

  const arrayfoObjects = [];
  const objectsvaue = {};

  filteredArrayOfMonths.forEach((elem, i) => {
    const objectsvaue = {};
    objectsvaue["month"] = elem;
    arrayfoObjects.push(objectsvaue);
  });
  //  console.log("arrayOfMonths--", arrayOfMonths)
  //  console.log("filteredArrayOfMonths--", filteredArrayOfMonths)
  //  console.log("arrayfoObjects--", arrayfoObjects)

  for (let index = 0; index < data1.length; index++) {
    for (let jindex = 0; jindex < arrayfoObjects.length; jindex++) {
      if (arrayfoObjects[jindex].month === data1[index].month) {
        if (arrayfoObjects[jindex].cumulativeTotal) {
          arrayfoObjects[jindex].cumulativeTotal =
            arrayfoObjects[jindex].cumulativeTotal +
            data1[index].totalForThatMonth;
        } else {
          arrayfoObjects[jindex].cumulativeTotal =
            data1[index].totalForThatMonth;
        }
      }
    }
  }

  for (let index = 0; index < 12; index++) {
    reducedData.push(0);
    for (let kindex = 0; kindex < arrayfoObjects.length; kindex++) {
      if (arrayfoObjects[kindex].month === index) {
        reducedData[index] = arrayfoObjects[kindex].cumulativeTotal;
      }
    }
  }

  // console.log("data1--", data1)
  //   console.log("data1--==", data1.indexOf({month: 5}))
  // console.log("data1--==", data1.findIndex())

  // console.log("orders--", orders)
  // console.log("reducedData--",reducedData);

  const data = {
    labels: months,
    datasets: [
      {
        label: "SALES VS MONTHS",
        // data: [33, 53, 85, 41, 44, 65],
        data: reducedData,
        // data:data1,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      // {
      //   label: "Second dataset",
      //   data: [33, 25, 35, 51, 54, 76,0,0,0,0,50],
      //   fill: false,
      //   borderColor: "#742774"
      // }
    ],
  };

  /////////////////////////////dontut data//////
  const donutData = {
    labels: ["PROCESSING ", "SHIPPED"],

    // 'Yellow', 'Green', 'Purple', 'Orange'

    datasets: [
      {
        label: "SHIPPING STATUS",
        data: [orders.length - noOFOrderShipped, noOFOrderShipped],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        hoverOffset: 4,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };

  const stockData = {
    labels: [
      "In Stock",
      "Out of Stock",
      // 'Yellow', 'Green', 'Purple', 'Orange'
    ],
    datasets: [
      {
        label: "STOCK STATUS OF PRODUCT",
        data: [productsCount - productOUtofStock, productOUtofStock],
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        hoverOffset: 4,
        borderColor: [
          // 'rgba(255, 99, 132, 1)',
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userClearError());
    }
    if (orderError) {
      alert.error(orderError);
      dispatch(clearErrors());
    }
    dispatch(getAllOrdersAction());
    dispatch(allUsersAction());
    dispatch(getProducts());

    //       console.log("data1--", data1)
    //    console.log("orders--", orders)
  }, [orderError, error, alert, dispatch]);

  return (
    <Fragment>
      {!loading && !orderLoading ? (
        <Fragment>
          <Metadata title="DASHBOARD" />
          <Dashboard />
          <div className="MainDashBoardDiv">
            <h1 className="toatalSalesHeader">
              Total sales =={" "}
              {totalMountOfOrders &&
                Math.round(totalMountOfOrders).toLocaleString("en-US")}
            </h1>
            <h2>DASHBOARD</h2>

            <div className="dashBoardsummary">
              <div>
                <p>Users-- {users && users.length}</p>
              </div>

              <div>
                <p>products-- {products && products.length}</p>
              </div>

              <div>
                <p>orders-- {orders && orders.length}</p>
              </div>
            </div>

            <Line data={data} />
          </div>

          <div className="doughnutcharts">
            <Doughnut
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "PRODUCT IN STOCK",
                    align: "center",
                    padding: {
                      top: 0,
                      bottom: 0,
                    },
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              }}
              data={stockData}
            />
            <Doughnut
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "SHIPPING STATUS",
                    align: "center",
                    padding: {
                      top: 0,
                      bottom: 0,
                    },
                    position: "top",
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              }}
              data={donutData}
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <Loader />{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default DashboardMainPart;
