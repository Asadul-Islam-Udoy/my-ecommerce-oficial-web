import React, { useEffect, useState } from "react";
import "./AdminOrder.css";
import { DataGrid } from "@mui/x-data-grid";
import Admin_Sidebar from "../homes/Admin_Sidebar";
import Admin_Headers from "../homes/Admin_Headers";
import OroderProduct from "./OroderProduct";
import OrderProcess from "./OrderProcess";
import OrderDelete from "./OrderDelete";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUserOrder,
  OrderStatusRest,
  UserOrderDelevariedUpdate,
} from "../../../actions/OrderAction";
import { useAlert } from "react-alert";
function AdminOrder() {
  const alert = useAlert();
  const [orderId, setOrderId] = useState("");
  const [profileShow, setProfileShow] = useState(false);
  const [sidebar, setSideBar] = useState(true);
  const [orderProduct, setOrderProduct] = useState(false);
  const [orderProcess, setOrderProcess] = useState(false);
  const [orderDelete, setOrderDelete] = useState(false);
  const { lodding, error, isOrderStatus, allOrders } = useSelector(
    (state) => state.allOrdersStore
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isOrderStatus) {
      alert.success("status update successfully!");
      dispatch(OrderStatusRest());
    }
    dispatch(GetAllUserOrder());
  }, [dispatch, error, alert]);

  const productHandler = (ordId) => {
    setOrderProduct((pre) => !pre);
    setOrderId(ordId);
  };
  const orderStatusDelevaried = (id, data) => {
    dispatch(UserOrderDelevariedUpdate(id, { orderStatus: data }));
  };
  const orderStatusProcessing = (id, data) => {
    dispatch(UserOrderDelevariedUpdate(id, { orderStatus: data }));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    {
      field: "orderstatus",
      headerName: "Orders Status",
      width: 130,
      renderCell: (param) => {
        return (
          <>
            <select>
              <option>{param.row.orderstatus}</option>
              <option
                style={{
                  backgroundColor:
                    param.row.orderstatus === "delevaried" ? "#87CEEB" : "red",
                }}
                onClick={() =>
                  orderStatusDelevaried(param.row.id, "delevaried")
                }
              >
                delevaried
              </option>
              <option
                style={{
                  backgroundColor:
                    param.row.orderstatus === "processing" ? "red" : "#87CEEB",
                }}
                onClick={() =>
                  orderStatusProcessing(param.row.id, "processing")
                }
              >
                processing
              </option>
            </select>
          </>
        );
      },
    },
    { field: "username", headerName: "UserName", width: 130 },
    { field: "number", headerName: "Number", width: 130 },
    { field: "address", headerName: "Address", width: 330 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "quentity", type: "number", headerName: "Quentity", width: 130 },
    { field: "amount", type: "number", headerName: "Amount", width: 130 },
    {
      field: "orderproduct",
      headerName: "Order Products",
      width: 130,
      renderCell: (param) => {
        return (
          <>
            <button
              onClick={() => productHandler(param.row.id)}
              className="btn btn1"
            >
              All Orders
            </button>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: () => {
        return (
          <>
            <button
              onClick={() => setOrderProcess((pre) => !pre)}
              className="btn btn2"
            >
              Update Orders
            </button>
            <button
              onClick={() => setOrderDelete((pre) => !pre)}
              className="btn btn3"
            >
              Delete Orders
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];
  allOrders?.forEach((element) => {
    rows.push({
      id: element._id,
      orderstatus: element.orderStatus,
      username: element.shippingInfo.name,
      number: element.shippingInfo.mobile,
      address: [
        element.shippingInfo.address,
        element.shippingInfo.city,
        element.shippingInfo.state,
        element.shippingInfo.country,
      ],
      status: element.orderInfo.status,
      quentity: element.itemInfo.length,
      amount: element.totalPrice,
    });
  });
  return (
    <>
      <div className="orders__container">
        {orderProduct && (
          <div>
            <OroderProduct orderId={orderId} />
          </div>
        )}
        {orderProcess && (
          <div>
            <OrderProcess />
          </div>
        )}
        {orderDelete && (
          <div>
            <OrderDelete />
          </div>
        )}
        <div>
          <Admin_Headers
            setSideBar={setSideBar}
            setProfileShow={setProfileShow}
          />
        </div>
        <div style={{ marginTop: "60px", position: "absolute" }}>
          <Admin_Sidebar sidebar={sidebar} />
        </div>
        <div className="orders__table__section">
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

export default AdminOrder;
