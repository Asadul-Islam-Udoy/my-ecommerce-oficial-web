import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./OrderProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUserOrder } from "../../../actions/OrderAction";
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
function OroderProduct({ orderId }) {
  const dispatch = useDispatch();
  const { lodding, error, allOrders } = useSelector(
    (state) => state.allOrdersStore
  );
  const orderFilter = allOrders?.find(
    (i) => i._id.toString() === orderId.toString()
  );
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(GetAllUserOrder());
  }, [dispatch, error, alert]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal__box" sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Order To The Products
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="orders__container">
              {orderFilter?.itemInfo?.map((item) => (
                <div className="order__product__box">
                  <div>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <img
                      src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImage}`}
                    />
                  </div>
                  <div>
                    <span>height:{item.height}</span>
                    <br />
                    <span>width:{item.width}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>colors:</span>
                    {item.colors.map((i) => (
                      <span>{i},</span>
                    ))}
                    <br />
                    <span style={{ fontWeight: "bold" }}>size:</span>
                    {item.sizes.map((i) => (
                      <span>{i},</span>
                    ))}
                  </div>
                  <div>
                    <span>quantity</span>
                    <br />
                    <span>{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default OroderProduct;
