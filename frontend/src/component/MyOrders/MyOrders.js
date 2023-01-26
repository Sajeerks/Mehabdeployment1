import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrdersAction } from "../../actions/orderActions";
import Metadata from "../layout/Metadata/Metadata";
import "./MyOrders.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { useAlert } from "react-alert";
import { useDemoData } from '@mui/x-data-grid-generator';
// import ReactPDF from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const MyOrders = () => {
  const printRef = React.useRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };





      
  const VISIBLE_FIELDS = ['id',"totalPrice","status","shippingStatus",'createAt']
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
    visibleFields: VISIBLE_FIELDS,
  });

  const { orders, loading, error } = useSelector((state) => state.myOrders);
  const { user, error:userEroror } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "shippingStatus",
      headerName: "Shipping status",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "createAt",
      headerName: "createAt",
      width: 150,
      type: "date",
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      type: "number",
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "payment Status",
      cellClassName:(params)=>{
        return params.getValue(params.id,"status")==="succeeded"?"greenColor":"redColor"
      },
      width: 110,
      editable: true,
      // resizable: true
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // flex: 0.2,
    },
    {
      field: "totalNoOfItmes",
      headerName: "itemcount",
      type: "number",
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    
      // resizable: true
    },
    {
      field: "options",
      headerName: "options",
      type: "number",
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      // resizable: true
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = [
    // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  orders &&
    orders.map((order) =>
      rows.push({
        id: order._id,
        status: order.paymentInfo.status,
        totalPrice: order.totalPrice,
        createAt: new Date(order.createdAt).toDateString(),
        shippingStatus: order.orderStatus,
        totalNoOfItmes: order.orderItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
      })
    );
  // console.log(rows)

  const handleOnCellClick = (params) => {
    // console.log("praams---", params);
    // console.log("praams.orw---", params.row);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrdersAction());
  }, [error]);

  return (
    <Fragment>
      <Metadata title={"my Orders"} />
      {orders.length !== 0 && !loading ? (
        <Fragment>
          <div className="gridDataContainer" id="gridDataWithID" ref={printRef}>
            <Typography>{user.name + "-- Orders"}</Typography>
            <Box
              sx={{
                height: 400,
                width: "100%",
                "& .super-app-theme--header": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                  color: "white",
                  // fontSize:"15px",
                  overflow: "break-word",
                  textAlign: "center",
                },
                "& .shipped": {
                  backgroundColor: "#ff943975",
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onCellClick={handleOnCellClick}
                getRowClassName={(params) =>
                  `super-app-theme--${params.row.status}`
                }
                experimentalFeatures={{ newEditingApi: true }}
                getCellClassName={(params) => {
                  if (params.field === "shippingStatus") {
                    if (params.value === "shipped") {
                      return "shipped";
                    }
                  }
                }}

                components={{ Toolbar: GridToolbar }} 
              />
            </Box>
          </div>
          <div className="htmlToPDFContainer">
          <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>
          </div>

        </Fragment>
      ) : (
        <Fragment>You do not have any Orders</Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
