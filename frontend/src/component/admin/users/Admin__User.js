import React, { useEffect, useState } from "react";
import "./Admin__User.css";
import { DataGrid } from "@mui/x-data-grid";
import Adimn from "../../../pages/Adimn";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_User_Reset,
  GetAllUsersAction,
  PermissionUsersAction,
} from "../../../actions/UsersAction";
import { useAlert } from "react-alert";
function Admin__User() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { userInfo } = useSelector((state) => state.UserLoginReducer);
  const { lodding, error, isPermission, allUsers } = useSelector(
    (state) => state.getAllUserStore
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isPermission) {
      alert.success("permission is successfully!");
      dispatch(Admin_User_Reset());
    }
    dispatch(GetAllUsersAction(userInfo?.user?._id));
  }, [userInfo?.user?._id, alert, error, isPermission]);

  const roles = ["admin", "co-admin", "user", "co-user"];

  const permissionHandler = (currentUser, roleUser, permission) => {
    console.log(currentUser, roleUser, permission);
    dispatch(PermissionUsersAction(currentUser, roleUser, { permission }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 3 },
    { field: "username", headerName: "User Name", width: 130, flex: 3 },
    { field: "email", headerName: "Email", width: 130, flex: 3 },
    {
      field: "role",
      headerName: "User Role",
      width: 90,
      flex: 2,
    },
    {
      field: "isValidated",
      headerName: "Is Validated",
      width: 160,
      flex: 2,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 160,
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <img
              src={`https://my-ecommerce-oficial-web.onrender.com/images/avatar/${params.row.avatar}`}
            />
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <div>
              <select className="permission__section">
                <option>Permissin Role</option>
                {roles.map((item) => (
                  <option
                    onClick={() =>
                      permissionHandler(
                        userInfo?.user?._id,
                        params.row.id,
                        item
                      )
                    }
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <button className="delete__button">Delete</button>
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];
  allUsers?.forEach((element) => {
    rows.push({
      id: element._id,
      username: element.username,
      email: element.email,
      role: element.role,
      isValidated: element.is_validated,
      avatar: element.avatar,
    });
  });
  return (
    <>
      <div>
        <Adimn />
      </div>
      <div className="user__table__section">
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
          style={{ height: "400px", backgroundColor: "gray" }}
        />
      </div>
    </>
  );
}

export default Admin__User;
