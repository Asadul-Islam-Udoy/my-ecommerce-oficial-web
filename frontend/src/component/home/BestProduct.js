import React, { useEffect } from "react";
import "./BestProduct.css";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Lodder from "../lodder/Lodder";
export default function BestProduct() {
  const alert = useAlert();
  const { lodding, error, products } = useSelector(
    (state) => state.offerProductStore
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [alert, error]);
  return (
    <>
      {lodding && <Lodder />}
      {Object.keys(products).map((key) => (
        <div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
              color: "yellow",
            }}
          >
            {key} %
          </div>
          <div className="best__product__container">
            {products[key].map((item) => (
              <div>
                <div className="best__box">
                  <span className="offers">Offer {item.offer}%</span>
                  <Link to={`/category/single/${item.name}/${item._id}`}>
                    <img
                      src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImages[0].image}`}
                      alt={item._id}
                    />
                  </Link>
                  <p>{item.name}</p>
                  <span>
                    <Rating
                      style={{ marginTop: "-10px" }}
                      name="read-only"
                      value={item.ratings}
                      readOnly
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
