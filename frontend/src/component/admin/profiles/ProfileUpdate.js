import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ProfileUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { AdminProfileUpdateAction } from "../../../actions/UsersAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ProfileUpdate() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.UserLoginReducer);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState(userInfo?.user?.username);
  const [email, setEmail] = useState(userInfo?.user?.email);
  const [image, setImage] = useState(userInfo?.user?.avatar);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { error, isAdminPrifile } = useSelector(
    (state) => state.adminProfileStore
  );
  const updateHandler = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set("username", username);
    myFrom.set("email", email);
    if (avatar) {
      myFrom.set("avatar", avatar);
    }
    dispatch(AdminProfileUpdateAction(userInfo?.user._id, myFrom));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isAdminPrifile) {
      alert.success("profile update successfully");
      navigate("/login");
    }
  }, [alert, error, isAdminPrifile]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal__boxs" sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Update To The User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="create__containers">
              <div>
                <form className="create__froms" onSubmit={updateHandler}>
                  <div>
                    <div>
                      <label>User Name</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="product name...."
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="product price...."
                      />
                    </div>
                    <div>
                      <label>Image</label>
                      <input
                        type="file"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        placeholder="product price...."
                      />
                    </div>
                  </div>
                  <div>
                    <div className="show__image">
                      {image && (
                        <div>
                          <img
                            src={`https://my-ecommerce-oficial-web.onrender.com/images/avatar/${image}`}
                            alt="imagest"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="profile__update__btn">Update</button>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileUpdate;
