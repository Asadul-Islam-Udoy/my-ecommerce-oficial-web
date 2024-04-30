import React, { useEffect, useState } from "react";
import "./Admin_Product_Banner.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ResetProductAction,
  homeBannerCreateAction,
  homeBannerGetAction,
} from "../../../actions/ProductAction";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
function Admin_Product_Banner({ setCreateBannerProduct }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [showImage, setShowImage] = useState([]);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const { lodding, error, isBanner, banners } = useSelector(
    (state) => state.bannerStore
  );
  const CreateHandler = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set("bannerText", description);
    if (image.length > 0) {
      for (let file of image) {
        myFrom.append("banners", file);
      }
    }
    dispatch(homeBannerCreateAction(banners[0]?._id, myFrom));
  };
  const handlerChange = (e) => {
    setImage(e.target.files);
    const files = Array.from(e.target.files);
    setShowImage([]);
    files.forEach((file) => {
      const render = new FileReader();
      render.onload = () => {
        if (render.readyState === 2) {
          setShowImage((pre) => [...pre, render.result]);
        }
      };
      render.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isBanner) {
      alert.success("banner update successfully");
      setCreateBannerProduct((pre) => !pre);
      dispatch(ResetProductAction());
    }
    dispatch(homeBannerGetAction());
  }, [alert, error, isBanner]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal__banner__box" sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add To The Product Banner
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="create__banner__container">
              <div>
                <form className="create__banner__from" onSubmit={CreateHandler}>
                  <div>
                    <div>
                      <label>Product Images</label>
                      <input
                        multiple
                        type="file"
                        required
                        onChange={handlerChange}
                      />
                    </div>
                    <div className="description">
                      <label>Description</label>
                      <textarea
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="button__section">
                      <button type="submit">Updata Banner</button>
                    </div>
                    <div className="showImage">
                      <div>
                        {showImage.length > 0 &&
                          showImage.map((img) => (
                            <div>
                              <p>new Image</p>
                              <img src={img} />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="showImage">
                      <div>
                        {banners?.length > 0 &&
                          banners[0]?.productBanner?.map((img, index) => (
                            <div>
                              <p>old Image{index + 1}</p>
                              <img
                                src={`https://my-ecommerce-oficial-web.onrender.com/images/banners/${img.banner}`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Admin_Product_Banner;
