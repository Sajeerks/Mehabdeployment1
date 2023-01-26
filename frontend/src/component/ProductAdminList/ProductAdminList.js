import React, { Fragment, useEffect } from "react";
import "./ProductAdminList.css";

import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata/Metadata";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// import { DataGridPro } from '@mui/x-data-grid-pro';
// import { useDemoData } from '@mui/x-data-grid-generator';
import { clearErrors, getAllproductsForAdminAction } from "../../actions/productActions";
import { Button } from "@mui/material";



const ProductAdminList = () => {
    const {loading, products:adminAllProducts, error} = useSelector(state=>state.adminAllProducts)

    const dispath =useDispatch()
     const alert = useAlert()

     const deleteProductfunction =(id)=>{

     }

     const columns = [
        { field: 'id', headerName: 'ID', width: 250,  },
        {
          field: 'name',
          headerName: 'product name',
          width: 150,
          // editable: true,
        },
        {
          field: 'category',
          headerName: 'category',
          width: 90,
          // editable: true,
        },
        {
          field: 'price',
          headerName: 'PRice',
          type: 'number',
          width: 90,
          // editable: true,
        },
        {
          field: 'createdAt',
          headerName: 'Created At',
          type: 'date',
          width: 110,
          // editable: true,
        },
        {
          field: 'numOfReviews',
          headerName: 'No of reviews',
          type: 'number',
          width: 110,
          // editable: true,
        },

        {
          field: 'stock',
          headerName: 'Stock',
          type: 'number',
          width: 110,
          // editable: true,
        },
        {
          field: 'ratings',
          headerName: 'Rating',
          type: 'number',
          width: 110,
          // editable: true,
        },
        {
          field: 'actions',
          headerName: 'actions',
          type: 'number',
          width: 150,
          sortable:"false",
          // flex:1,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link  className="editIconShower" to={`/edit/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
                <Link  className="editIconShower" to={`/edit/product2/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
                <Link  className="editIconShower" to={`/edit/product3/${params.getValue(params.id, "id")}`}>
                  <AutoFixHighIcon />
                </Link>

                <Button
                  onClick={() =>
                    deleteProductfunction(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
      

          // editable: true,
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


   
      
      const roww=[]


      adminAllProducts &&  adminAllProducts.forEach(product=>{
        roww.push(
  {      id:product._id, 
        name:product.name,
        category:product.category,
        price:product.price,
        createdAt:new Date(product.createdAt).toLocaleString("en-UK", {dateStyle:"long",}),
        numOfReviews:product.numOfReviews,
        stock:product.stock,
        ratings:product.ratings,
        name:product.name,}
        )
      })

      // const rows = adminAllProducts && [...adminAllProducts]
      // console.log("adminAllProducts---",adminAllProducts)
        // console.log("rowss - in product Damin list --- ", rows)
        // console.log("roww - in product Damin list --- ", roww)

      

        const rows = []
      // const rows = [
      //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      // ];

      // const { data } = useDemoData({
      //   dataSet: 'Commodity',
      //   rowLength: 100000,
      //   editable: true,
      // });

  

      useEffect(() => {
         if(error){
          alert.error(error)
          dispath(clearErrors())
         }

         dispath(getAllproductsForAdminAction())
      }, [])
      
    

  return <Fragment>
    {loading?(<Loader/>):(<Fragment>
        <Metadata title="PRODUCT MASTER LIST"/>
        <div className="productlistcomponent">
            <h1>ALL PRODUCT LIST</h1>

            <div className="datagrid_for_all_product_list">
            <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      components={{ Toolbar: GridToolbar }}

        rows={roww}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>


    {/* <Box sx={{ height: 520, width: '100%' }}>
      <DataGridPro
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box> */}


            </div>
        </div>


        



        </Fragment> )}


  </Fragment>;
};

export default ProductAdminList;
