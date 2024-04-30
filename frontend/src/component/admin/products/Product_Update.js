import React, { useEffect, useState } from "react";
import "./Product_Create.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductUpdateAction,
  ResetProductAction,
} from "../../../actions/ProductAction";
import { useAlert } from "react-alert";
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
function Product_Update({ setUpdateProduct, productId }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
  const { lodding, error, isProductUpdate, products } = useSelector(
    (state) => state.ProductCreateReducer
  );
  const product = products.find((item) => item._id === productId);
  const [color, setColor] = useState(product?.colors);
  const [size, setSize] = useState(product?.sizes);
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [stock, setStock] = useState(product?.stock);
  const [description, setDescription] = useState(product?.description);
  const [offer, setOffer] = useState(product?.offer);
  const [height, setHeight] = useState(product?.height);
  const [width, setWidth] = useState(product?.width);
  const [image, setImage] = useState([]);
  const [showImage, setShowImage] = useState([product?.productImages]);
  const [newImage, setNewImage] = useState([]);
  const colors = [
    { name: "red" },
    { name: "blue" },
    { name: "green" },
    { name: "yellow" },
    { name: "cyan" },
    { name: "lime" },
    { name: "gray" },
    { name: "orange" },
    { name: " purple" },
    { name: "black" },
    { name: "white" },
    { name: "pink" },
    { name: "darkblue" },
  ];
  const sizes = [
    { name: "small" },
    { name: "medium" },
    { name: "large" },
    { name: "xl" },
    { name: "xxl" },
  ];
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (product?.productImages.length > 0) {
      setShowImage(product?.productImages);
    }
  }, [product?.productImages]);

  useEffect(() => {
    if (image.length > 0) {
      const array = Array.from(image);
      array.forEach((file) => {
        const reander = new FileReader();
        reander.onload = () => {
          if (reander.readyState === 2) {
            setNewImage((pre) => [...pre, reander.result]);
          }
        };
        reander.readAsDataURL(file);
      });
    }
  }, [image.length]);

  const sizeHandler = (e) => {
    e.preventDefault();
    if (!size.includes(e.target.value)) {
      setSize((pre) => [...pre, e.target.value]);
    }
    if (size.includes(e.target.value)) {
      console.log("hi");
      setSize(size.filter((item) => item !== e.target.value));
    }
  };
  const colorHandler = (e) => {
    e.preventDefault();
    if (!color.includes(e.target.value)) {
      setColor((pre) => [...pre, e.target.value]);
    }
    if (color.includes(e.target.value)) {
      setColor(color.filter((item) => item !== e.target.value));
    }
  };
  const updateHandler = (e) => {
    e.preventDefault();
    setButton(true);
    const myFrom = new FormData();
    myFrom.set("name", name);
    myFrom.set("description", description);
    myFrom.set("price", price);
    myFrom.set("offer", offer);
    myFrom.set("stock", stock);
    myFrom.set("width", width);
    myFrom.set("height", height);
    for (let i of size) {
      myFrom.append("sizes", i);
    }
    for (let i of color) {
      myFrom.append("colors", i);
    }
    if (image.length > 0) {
      for (let i of image) {
        myFrom.append("images", i);
      }
    }
    dispatch(ProductUpdateAction(productId, myFrom));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isProductUpdate) {
      alert.success("product update successfully!");
      setButton(false);
      setName("");
      setImage([]);
      setShowImage([]);
      setDescription("");
      setUpdateProduct(false);
    }
    dispatch(ResetProductAction());
  }, [dispatch, isProductUpdate, error, alert]);

  return (
    <div>
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
            Update To The Product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="create__container">
              <div>
                <form className="create__from" onSubmit={updateHandler}>
                  <div>
                    <div>
                      <label>Product Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="product name...."
                      />
                    </div>
                    <div>
                      <label>Product Price</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="product price...."
                      />
                    </div>
                    <div>
                      <details>
                        <summary style={{ width: "200px" }}>
                          Select Colors
                        </summary>
                        <div
                          style={{
                            position: "absolute",
                            backgroundColor: "gray",
                            width: "170px",
                            padding: "5px",
                            borderRadius: "4px",
                            height: "300px",
                            overflow: "scroll",
                          }}
                        >
                          {colors.map((i) => (
                            <p>
                              <Checkbox
                                value={i.name}
                                onChange={colorHandler}
                                {...label}
                                defaultChecked={product?.colors?.includes(
                                  i.name
                                )}
                                size="small"
                              />
                              {i.name}
                            </p>
                          ))}
                        </div>
                      </details>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Product Height</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="product height...."
                      />
                    </div>
                    <div>
                      <label>Product Width</label>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="product width...."
                      />
                    </div>
                    <div>
                      <details>
                        <summary style={{ width: "200px" }}>
                          Select Size
                        </summary>
                        <div
                          style={{
                            position: "absolute",
                            backgroundColor: "gray",
                            width: "170px",
                            padding: "5px",
                            borderRadius: "4px",
                            height: "200px",
                            overflow: "scroll",
                          }}
                        >
                          {sizes.map((i) => (
                            <p>
                              <Checkbox
                                value={i.name}
                                onChange={sizeHandler}
                                defaultChecked={product?.sizes?.includes(
                                  i.name
                                )}
                                size="small"
                              />
                              {i.name}
                            </p>
                          ))}
                        </div>
                      </details>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Product Offer</label>
                      <input
                        type="number"
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        placeholder="product offer...."
                      />
                    </div>
                    <div>
                      <label>Product Images</label>
                      <input
                        multiple
                        type="file"
                        onChange={(e) => setImage(e.target.files)}
                      />
                    </div>
                    <div>
                      <label>Product Stock</label>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="product Stock...."
                      />
                    </div>
                  </div>
                  <div>
                    <div className="description">
                      <label>Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="button__section">
                      <button disabled={button} type="submit">
                        Update Product
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="show__image">
                      <p>Old Images</p>
                      {showImage.length > 0 &&
                        showImage.map((item) => (
                          <img
                            src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.image}`}
                            alt="imagest"
                          />
                        ))}
                    </div>
                    <div className="show__image">
                      {newImage.length > 0 && <p>New Images</p>}
                      {newImage.length > 0 &&
                        newImage.map((item) => (
                          <img src={item} alt="imagest" />
                        ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Product_Update;
