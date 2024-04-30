import React, { useEffect, useRef, useState } from "react";
import "./CategoriesProduct.css";
import Rating from "@mui/material/Rating";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { Link } from "react-router-dom";
function CategoriesProduct({ categoryItem }) {
  const [count_button, setCount_Button] = useState(0);
  const scrollBtn = useRef();
  let categoryLength;
  Object.keys(categoryItem).map((key) => {
    categoryLength = categoryItem[key].length - 1;
  });
  console.log("v", categoryLength);
  function incrementFun() {
    if (categoryLength > count_button) {
      setCount_Button((pre) => pre + 4);
      if (categoryLength < count_button) {
        setCount_Button(categoryLength - 1);
      }
    }
    if (categoryLength < count_button) {
      setCount_Button(categoryLength - 1);
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
    if (categoryLength < count_button) {
      setCount_Button(categoryLength - 1);
    }
    if (count_button < 0) {
      setCount_Button(0);
    }
  }, [count_button]);

  useEffect(() => {
    const btnlide = scrollBtn.current;
    const nodelist = btnlide.querySelectorAll("img");
    if (nodelist) {
      const scrolls = new IntersectionObserver((scress) => {
        scress.forEach((i) => {
          if (i.isIntersecting) {
            i.target.classList.add("visible");
          } else {
            i.target.classList.remove("visible");
          }
        });
      });
      nodelist.forEach((st) => scrolls.observe(st));
    }
  });
  return (
    <>
      {Object.keys(categoryItem).map((key) => (
        <div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <h3 className="h3__tag" style={{ color: "white" }}>
              This Is {key} Products
            </h3>
          </div>
          <div ref={scrollBtn} className="category__container">
            {categoryItem[key]
              ?.slice(count_button, count_button + 4)
              .map((item, index) => (
                <div className="category__box">
                  <Link to={`/category/single/${item.name}/${item._id}`}>
                    <img
                      src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImages[0].image}`}
                      alt={index}
                    />
                  </Link>
                  <div>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span>$ {item.price} </span>
                    <span>${item.oldPrice} </span>
                  </div>
                  <div>
                    <span style={{ marginTop: "-10px" }}>
                      <Rating name="read-only" value={item.ratings} readOnly />
                    </span>
                    <span>({item.numOfReview})</span>
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
        </div>
      ))}
    </>
  );
}

export default CategoriesProduct;
