import React, { useEffect, useState } from "react";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCategoryProductsAction } from "../../actions/CategoryAction";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import Lodder from "../lodder/Lodder";

function CategoriBasic({ categoryId, productId, slug }) {
  const alert = useAlert();
  const navigate = useNavigate();
  const [count_button, setCount_Button] = useState(0);
  const dispatch = useDispatch();
  const { lodding, error, singleProducts } = useSelector(
    (state) => state.singleCategoryProducts
  );

  function incrementFun() {
    if (singleProducts.length > count_button) {
      setCount_Button((pre) => pre + 4);

      if (singleProducts.length < count_button) {
        setCount_Button(singleProducts.length - 1);
      }
    }
    if (singleProducts.length < count_button) {
      setCount_Button(singleProducts.length - 1);
    }
  }
  function decrementFun() {
    if (count_button > 0) {
      setCount_Button((pre) => pre - 4);
    }
    if (count_button < 0) {
      setCount_Button(0);
    }
  }
  useEffect(() => {
    if (singleProducts.length < count_button) {
      setCount_Button(singleProducts.length - 1);
    }
  }, [count_button]);
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getSingleCategoryProductsAction(categoryId, productId));
  }, [dispatch, error, alert, categoryId, productId]);

  const singleProductHandler = (id) => {
    navigate(`/category/single/${slug}/${id}`);
  };
  return (
    <>
      {lodding && <Lodder />}
      {singleProducts?.length > 0 ? (
        <div style={{ width: "99.2%" }} className="category__container">
          {singleProducts
            ?.slice(count_button, count_button + 4)
            .map((item, index) => (
              <div style={{ margin: "5px" }} className="category__box">
                <Link to={`/category/single/${slug}/${item._id}`}>
                  <img
                    onClick={() => singleProductHandler(item._id)}
                    src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImages[0].image}`}
                    alt={index}
                  />
                </Link>
                <div>
                  <span>{item.name}</span>
                </div>
                <div>
                  <span>$ 1{item.price} </span>
                  <span>${item.oldPrice} </span>
                </div>
                <div>
                  <span style={{ marginTop: "-10px" }}>
                    <Rating name="read-only" value={item.ratings} readOnly />
                  </span>
                  <span>(12{index})</span>
                </div>
              </div>
            ))}
          <div className="category__button">
            <p className="decrement" onClick={decrementFun}>
              <FirstPageIcon />
            </p>
            <p className="increment" onClick={incrementFun}>
              <LastPageIcon />
            </p>
          </div>
        </div>
      ) : (
        <div className="no__similar__product">
          <DoNotDisturbAltIcon style={{ fontSize: "50px" }} />
          <h2>No</h2>
        </div>
      )}
    </>
  );
}

export default CategoriBasic;
