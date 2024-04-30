import React, { useEffect, useState } from "react";
import "./Product_Create.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ProductCreateAction,
  ResetProductAction,
} from "../../../actions/ProductAction";
import { CategoryGetAction } from "../../../actions/CategoryAction";
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
function Product_Create({ setCreateProduct }) {
  const [button, setButton] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryStore);
  const { lodding, error, products, isProducts } = useSelector(
    (state) => state.ProductCreateReducer
  );
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState(0);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [image, setImage] = useState([]);
  const [showImage, setShowImage] = useState([]);
  const [categoriId, setCategoriId] = useState("");
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
  const CreateHandler = (e) => {
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
    myFrom.set("categoriId", categoriId);
    for (let i of size) {
      myFrom.append("size", i);
    }

    for (let i of color) {
      myFrom.append("color", i);
    }

    for (let i of image) {
      myFrom.append("images", i);
    }
    dispatch(ProductCreateAction(myFrom));
    setButton(false);
  };
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (image.length > 0) {
      const array = Array.from(image);
      array.forEach((file) => {
        const reander = new FileReader();
        reander.onload = () => {
          if (reander.readyState === 2) {
            setShowImage((pre) => [...pre, reander.result]);
          }
        };
        reander.readAsDataURL(file);
      });
    }
  }, [image.length]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      setButton(false);
    }
    if (isProducts) {
      alert.success("product create successfully!");
      setButton(false);
      setName("");
      setImage([]);
      setShowImage([]);
      setDescription("");
      setCreateProduct(false);
    }
    dispatch(ResetProductAction());
  }, [dispatch, isProducts, error, alert]);
  const sizeHandler = (e) => {
    e.preventDefault();
    if (!size.includes(e.target.value)) {
      setSize((pre) => [...pre, e.target.value]);
    }
    if (size.includes(e.target.value)) {
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
  useEffect(() => {
    dispatch(CategoryGetAction());
  }, []);
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
            Add To The Product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="create__container">
              <div>
                <form className="create__from" onSubmit={CreateHandler}>
                  <div>
                    <div>
                      <label>Product Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="product name...."
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
                                {...label}
                                defaultChecked={false}
                                size="small"
                              />
                              {i.name}
                            </p>
                          ))}
                        </div>
                      </details>
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
                                defaultChecked={false}
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
                      <label>Product Price</label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="product price...."
                      />
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
                        required
                        onChange={(e) => setImage(e.target.files)}
                      />
                    </div>
                    <div>
                      <label>Product Stock</label>
                      <input
                        type="number"
                        required
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="product Stock...."
                      />
                    </div>
                  </div>
                  <div>
                    <div className="descriptionf">
                      <label>Description</label>
                      <textarea
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div
                      className="descriptionf"
                      style={{ marginRight: "10px", marginTop: "10px" }}
                    >
                      <select
                        value={categoriId}
                        onChange={(e) => setCategoriId(e.target.value)}
                        style={{ width: "200px", padding: "6px" }}
                      >
                        <label>Category</label>
                        <option>seletce category</option>
                        {categories?.map((item) => (
                          <option value={item._id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="button__section">
                      <button disabled={button} type="submit">
                        Add Product
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="show__image">
                      {showImage.length > 0 &&
                        showImage.map((item) => (
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

export default Product_Create;
