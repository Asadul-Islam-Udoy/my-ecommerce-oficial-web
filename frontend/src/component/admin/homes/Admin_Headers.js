import React, { useState } from "react";
import "./Admin_Headers.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogoutAction } from "../../../actions/UsersAction";
function Admin_Headers({ setSideBar, setProfileShow }) {
  const { userInfo } = useSelector((state) => state.UserLoginReducer);
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(UserLogoutAction());
    navigate("/login");
  };
  return (
    <>
      <div className="headers__container">
        <div className="herders__box">
          <img
            title="sidbar"
            onClick={() => setSideBar((pre) => !pre)}
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1291529831.1679838217&semt=sph"
            alt="imgesi"
          />
          <span> @ Asadul Islam</span>
          <div className="headers__right__side">
            <button>Orders (4)</button>
            <div title="profile" className="admin__profile">
              <img
                title="profile"
                onClick={() => setProfile((pre) => !pre)}
                src={`https://my-ecommerce-oficial-web.onrender.com/images/avatar/${userInfo?.user?.avatar}`}
                alt="lseo"
              />
              {profile && (
                <div className="profile__box">
                  <li
                    onClick={() => setProfileShow((pre) => !pre)}
                    title="profile"
                  >
                    <AccountCircleIcon />
                    profile
                  </li>
                  <li onClick={logoutHandler} title="logout">
                    <LogoutIcon />
                    <Link style={{ color: "white"}}>logout</Link>
                  </li>
                  <li title="home">
                    <HomeIcon />
                    <Link to="/" style={{ color: "white" }}>
                      home
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_Headers;
