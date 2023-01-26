import { Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getOrderDetailsAction } from "../../actions/orderActions";
import Metadata from "../layout/Metadata/Metadata";
import Loader from "../Loader/Loader";
import "./OrderDetails.css";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const OrderDetails = () => {
  const { id } = useParams();
  //   console.log("id in ordedetails--", id);
  const { order, loading, error } = useSelector((state) => state.singleOrder);
  const dispatch = useDispatch();
  const alert = useAlert();
  const paidDate = order.paidAt && Date(order.paidAt);
  //   console.log("paidAt in abvoee==", paidDate);
  // console.log("paidAt in months==",paidDate.getMonth())

  function formatDate(paidDate) {
    var d = new Date(paidDate),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  //   console.log("paidData --", formatDate(paidDate));
  // console.log("paidData --",order.paidAt && order.paidAt.substring(0,5))

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 220,
      headerClassName: "hhhcolor",
      flex: 1,
    },
    {
      field: "slno",
      headerName: "SLNO",
      minWidth: 100,
      headerClassName: "hhhcolor",
      flex: 1,
    },
    {
      field: "imager",
      headerName: "Image",
      minWidth: 200,
      headerClassName: "hhhcolor",
      flex: 1,

      renderCell: (params) => {
        //   console.log(params);
        return (
          <>
            <Avatar
              src={params.value}
              sx={{ width: "100px", height: "100px" }}
            />
            {params.row.name}
          </>
        );
      },
    },

    {
      field: "name",
      headerName: "Product name",
      minWidth: 150,
      editable: true,
      headerClassName: "hhhcolor",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      editable: true,
      headerClassName: "hhhcolor",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Qty",
      type: "number",
      minWidth: 150,
      editable: true,
      headerClassName: "hhhcolor",
      flex: 1,
    },
  ];

  const rows = [];
  order.orderItems &&
    order.orderItems.map((item, index) =>
      rows.push({
        id: item._id,
        name: item.name,
        imager: item.image,
        price: item.price,
        quantity: item.quantity,
        slno: index + 1,
      })
    );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetailsAction(id));
  }, [id, error, dispatch, alert]);

  return (
    <Fragment>
      <Metadata title={`Order detils of order ${id}`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsContainer">
            <Typography component={"h1"} variant={"h4"}>
              ORDER ID - {order._id && order._id}
            </Typography>

            <div>
              <span>Payment Status</span>
              <p>{order.paymentInfo && order.paymentInfo.status}</p>
            </div>

            <div>
              <span>Payment ID</span>
              <p>{order.paymentInfo && order.paymentInfo.id}</p>
            </div>

            <div>
              <span>paidAt</span>
              <p>{order.paidAt && formatDate(paidDate)}</p>
              {/* <p> month =={order.paidAt && new Date( Date(order.paidAt)).getMonth()+1}</p> */}
            </div>
            <div>
              <span>total Price</span>
              <p>{order.totalPrice && order.totalPrice}</p>
            </div>
            <div>
              <span>ADDRESS</span>
              <p>
                {order.shippingInfo &&
                  order.shippingInfo.address +
                    ", " +
                    order.shippingInfo.city +
                    ", " +
                    order.shippingInfo.state +
                    ", " +
                    order.shippingInfo.country +
                    ", " +
                    order.shippingInfo.pinCode +
                    ", phoneNO :" +
                    order.shippingInfo.phoneNo}
              </p>
            </div>
            <div>
              <span>SHIPPING STATUS </span>
              <p>{order.orderStatus && order.orderStatus}</p>
            </div>
          </div>
          <h3 className="itmelistHeading">Item list</h3>

          <div id="dataGridFororderitems">
            <Box sx={{ height: "40vh", width: "90vw" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                rowHeight={110}
              />
            </Box>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
