import React, { useState } from "react";
import "./AdminReviews.css";
import { DataGrid } from "@mui/x-data-grid";
import Admin_Sidebar from "../homes/Admin_Sidebar";
import Admin_Headers from "../homes/Admin_Headers";
import AdminReviewDelete from "./AdminReviewDelete";
import { useSelector } from "react-redux";
function AdminReviews() {
  const [profileShow, setProfileShow] = useState(false);
  const [sidebar, setSideBar] = useState(true);
  const [deleteRevies, setDeleteReviews] = useState(false);
  const { lodding, error, products } = useSelector(
    (state) => state.ProductCreateReducer
  );
  console.log("hip", products);
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "review", headerName: "Reviews", width: 230 },
    { field: "productname", headerName: "Product Name", width: 230 },
    { field: "rating", headerName: "Rating", width: 230 },
    {
      field: "image",
      headerName: "Product Image",
      width: 280,
      renderCell: (param) => {
        return (
          <>
            <img
              src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${param.row.image}`}
            />
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (param) => {
        return (
          <>
            <butto
              className="btn btn3"
              onClick={() => setDeleteReviews((pre) => !pre)}
            >
              Delete
            </butto>
          </>
        );
      },
    },
  ];

  const rows = [];
  products?.forEach((element) => {
    rows.push({
      id: element._id,
      productname: element.name,
      rating: element.ratings,
      review: element.reviews.length,
      image: element.productImages[0].image,
    });
  });
  return (
    <>
      {deleteRevies && <AdminReviewDelete />}
      <div className="reviews__container">
        <div>
          <Admin_Headers
            setSideBar={setSideBar}
            setProfileShow={setProfileShow}
          />
        </div>
        <div style={{ marginTop: "60px", position: "absolute" }}>
          <Admin_Sidebar sidebar={sidebar} />
        </div>
        <div className="reviews__table__section">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReviews;
