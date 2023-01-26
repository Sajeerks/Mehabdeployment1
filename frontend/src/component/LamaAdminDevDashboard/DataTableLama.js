import React from "react";
import "./DataTableLama.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";



const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "AgeName",
    headerName: "Last Name & age",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/DashBoardMainLama/users/${params.row.id}`}>
            {" "}
            <p>
              {params.row.age}++ {params.row.lastName}
            </p>
          </Link>
        </>
      );
    },
  },
  {
    field: "actions",
    headerName: "YOur Actions",
    description: " action to delete or view the post",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
     
            <Link to={`/DashBoardMainLama/users/${params.row.id}`}>VIEW</Link>
       

          <Button variant="contained" color="error" sx={{ml:3}}>
            Delete
          </Button>
        </>
      );
    },
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataTableLama = () => {

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTableLama;
