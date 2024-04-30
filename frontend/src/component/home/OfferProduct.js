import React, { useEffect, useRef } from "react";
import "./OfferProduct.css";
import { useSelector } from "react-redux";
import Lodder from "../lodder/Lodder";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
function OfferProduct() {
  const { lodding, error, products } = useSelector(
    (state) => state.homeUniqueProductStore
  );
  const scrollBtn = useRef();
  useEffect(() => {
    const btnlide = scrollBtn.current;
    const nodelist = btnlide.querySelectorAll("img");
    if (nodelist) {
      const scrolls = new IntersectionObserver((scress) => {
        scress.forEach((i) => {
          if (i.isIntersecting) {
            i.target.classList.add("visible1");
          } else {
            i.target.classList.remove("visible1");
          }
        });
      });
      nodelist.forEach((st) => scrolls.observe(st));
    }
  });
  return (
    <>
      {lodding && <Lodder />}
      <div className="offer__container">
        <div className="offer__box">
          <div ref={scrollBtn} className="offer__images__section">
            {products?.map((item) => (
              <Link to={`/category/single/${item.name}/${item._id}`}>
                <div className="offer__images">
                  {item.offer > 0 && (
                    <div className="offer__persen__section">
                      <p>{item.offer}%</p>
                    </div>
                  )}
                  <img
                    loading="true"
                    src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImages[0].image}`}
                  />
                  <div className="name__section">
                    <div>
                      <span>{item.name}</span>
                    </div>
                    <br />
                    <div>
                      <span>$ {item.price}</span>
                      <span>${item.oldPrice}</span>
                    </div>
                    <br />
                    <div>
                      <span>
                        <Rating
                          style={{ marginTop: "-10px" }}
                          name="read-only"
                          value={item.ratings}
                          readOnly
                        />
                      </span>
                      <span style={{ marginTop: "15px" }}>
                        {item.numOfReview}( reviews)
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: "14px" }}>
                        {item.description.substring(0, 50)}....
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OfferProduct;
