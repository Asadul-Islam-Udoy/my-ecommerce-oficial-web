import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import Navber from "../home/Navber";
import CategoriBasic from "./CategoriBasic";
import UserReview from "./UserReview";
import Rating from "@mui/material/Rating";
import { ProductSingleAction } from "../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import ReviewCreate from "./ReviewCreate";
import Footer from "../home/Footer";
import ReactImageMagnify from "react-image-magnify";
import { AddToCardAction } from "../../actions/OrderAction";
import { useAlert } from "react-alert";
import Lodder from "../lodder/Lodder";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function SingleProduct() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [btHeight, setBtHeight] = useState(0);
  const [btWidth, setBtWidth] = useState(0);
  const { id } = useParams();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [counts, setCounts] = useState(1);
  const { error, lodding, product } = useSelector(
    (state) => state.singleProduct
  );
  const [value, setValue] = useState(0);
  const [quantiry, setQuantity] = useState(0);
  const [review, setReview] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const quantityIncrementHandler = () => {
    if (quantiry !== product.stock) setQuantity(quantiry + 1);
  };

  const quantityDecrementHandler = () => {
    if (quantiry !== 0) {
      setQuantity(quantiry - 1);
    }
  };
  useEffect(() => {
    dispatch(ProductSingleAction(id));
    setValue(product?.ratings);
  }, [id, product?.ratings]);

  let Five = 0;
  let Four = 0;
  let Thire = 0;
  let Two = 0;
  let One = 0;
  product?.reviews?.forEach((item) => {
    if (item.rating === 5) {
      Five += 1;
    }
    if (item.rating === 4) {
      Four += 1;
    }
    if (item.rating === 3) {
      Thire += 1;
    }
    if (item.rating === 2) {
      Two += 1;
    }
    if (item.rating === 1) {
      One += 1;
    }
  });

  const AddToCardHandler = () => {
    if (quantiry === 0) {
      alert.error("please select the quantity");
    } else {
      dispatch(AddToCardAction(id, quantiry, colors, sizes));
      navigate(`/checkout/${slug}/${id}`);
    }
  };
  const sizeHandler = (item) => {
    if (!sizes.includes(item)) {
      setSizes((pre) => [...pre, item]);
    }
    if (sizes.includes(item)) {
      setSizes((pre) => sizes.filter((i) => i !== item));
    }
  };
  const colorHandler = (item) => {
    if (!colors.includes(item)) {
      setColors((pre) => [...pre, item]);
    }
    if (colors.includes(item)) {
      setColors((pre) => colors.filter((i) => i !== item));
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error, alert]);

  const heightIncrementHandler = () => {
    setBtHeight((pre) => pre + 1);
  };
  const heightDecrementHandler = () => {
    if (btHeight > 0) {
      setBtHeight((pre) => pre - 1);
    }
  };
  const widthIncrementHandler = () => {
    setBtWidth((pre) => pre + 1);
  };
  const widthDecrementHandler = () => {
    if (btWidth > 0) {
      setBtWidth((pre) => pre - 1);
    }
  };
  return (
    <>
      <div style={{ marginTop: "-10px" }}>
        <Navber />
      </div>
      {lodding && <Lodder />}
      <div>{review && <ReviewCreate productId={product?._id} />}</div>
      <div className="single__product__container">
        <div style={{ marginTop: "40px" }} className="single__product__header">
          <img
            src="https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/11e0719e75e67bbeafcfce50b1b0ceb4.svg"
            alt="imsfer"
          />
          <div>
            <button>{product?.offer}%</button>
            <p>${product?.price}</p>
            <p>${product?.oldPrice}</p>
          </div>
        </div>
        <div className="single__product__box">
          <div className="image__section">
            {product?.productImages?.slice(counts - 1, counts).map((item) => (
              <div className="zoom__images__section">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: `https://my-ecommerce-oficial-web.onrender.com/images/products/${item.image}`,
                    },
                    largeImage: {
                      src: `https://my-ecommerce-oficial-web.onrender.com/images/products/${item.image}`,
                      width: 1700,
                      height: 1800,
                    },
                  }}
                />
              </div>
            ))}
            <div className="pariend__image">
              {product?.productImages?.map((item, index) => (
                <div>
                  <img
                    onClick={() => setCounts(index + 1)}
                    src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.image}`}
                    alt={item._id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <h3>{product?.name}</h3>
              <span>
                <Rating name="read-only" value={value} readOnly />
              </span>
              <p style={{ marginTop: "-5px" }}>
                {product?.ratings?.toFixed(1)} rating
              </p>
              <hr />
            </div>
            <div className="single__detais__buttom">
              <p>Heihgt</p>
              <div>
                <span>{product?.height}ft</span>
                <div>
                  <button onClick={heightDecrementHandler}>-</button>
                  <input value={btHeight} readOnly />
                  <button onClick={heightIncrementHandler}>+</button>
                </div>
              </div>
            </div>
            <div className="single__detais__buttom">
              <p>Width</p>
              <div>
                <span>{product?.width}ft</span>
                <div>
                  <button onClick={widthDecrementHandler}>-</button>
                  <input value={btWidth} readOnly />
                  <button onClick={widthIncrementHandler}>+</button>
                </div>
              </div>
            </div>
            {product?.sizes?.length > 0 && (
              <div className="single__detais__buttom">
                <p>Size</p>
                <div>
                  {product?.sizes?.map((item, index) => (
                    <span>
                      {item}
                      <Checkbox
                        onClick={() => sizeHandler(item)}
                        {...label}
                        defaultChecked={false}
                        style={{
                          color: `${item}`,
                        }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product?.colors?.length > 0 && (
              <div className="single__detais__buttom">
                <p>Colors</p>
                <div>
                  {product?.colors?.map((item, index) => (
                    <span>
                      {item}
                      <Checkbox
                        onClick={() => colorHandler(item)}
                        {...label}
                        defaultChecked={false}
                        style={{
                          color: `${item}`,
                        }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="add__to__card">
              <button onClick={AddToCardHandler}>Add To Card</button>
            </div>
            <div>
              <p style={{ fontSize: "14px", fontStyle: "italic" }}>
                {product?.description}
              </p>
            </div>
          </div>
          <div className="review__section__right">
            <div>
              <p>Product Quantity</p>
              <div className="quantitys__section">
                <button onClick={quantityDecrementHandler}>-</button>
                <div>
                  <input value={quantiry} />
                  <div className="quantity__overflow">
                    <div>
                      {[...Array(product?.stock).keys()].map((i) => (
                        <span
                          onClick={() => setQuantity(i + 1)}
                          style={{
                            backgroundColor: `${
                              i + 1 === quantiry ? "tomato" : ""
                            }`,
                          }}
                        >
                          {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={quantityIncrementHandler}>+</button>
              </div>
            </div>
            <div className="review__role__section">
              <p>Reviews role</p>
              <div className="review__box">
                <div>
                  <span style={{ color: "red", fontSize: "10px" }}>
                    5 start
                  </span>
                  <div>
                    {" "}
                    <p style={{ width: `${Five}%` }}></p>
                  </div>
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {Five}%
                  </span>
                </div>
                <div>
                  <span style={{ color: "red", fontSize: "10px" }}>
                    4 start
                  </span>
                  <div>
                    {" "}
                    <p style={{ width: `${Four}%` }}></p>
                  </div>
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {Four}%
                  </span>
                </div>
                <div>
                  <span style={{ color: "red", fontSize: "10px" }}>
                    3 start
                  </span>
                  <div>
                    {" "}
                    <p style={{ width: `${Thire}%` }}></p>
                  </div>
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {Thire}%
                  </span>
                </div>
                <div>
                  <span style={{ color: "red", fontSize: "10px" }}>
                    2 start
                  </span>
                  <div>
                    {" "}
                    <p style={{ width: `${Two}%` }}></p>
                  </div>
                  <span style={{ color: "red", fontSize: "12px" }}>{Two}%</span>
                </div>
                <div>
                  <span style={{ color: "red", fontSize: "10px" }}>
                    1 start
                  </span>
                  <div>
                    <p style={{ width: `${One}%` }}></p>
                  </div>
                  <span style={{ color: "red", fontSize: "12px" }}>{One}%</span>
                </div>
              </div>
            </div>
            <div className="review__button">
              <button onClick={() => setReview((pre) => !pre)}>Reviews</button>
            </div>
          </div>
        </div>
      </div>
      <div className="categori__basic">
        <p>Similar Category</p>
        <CategoriBasic
          categoryId={product?.category}
          productId={product?._id}
          slug={slug}
        />
      </div>
      <div className="categori__basic">
        {product?.reviews?.length > 0 ? <p>User Reviews</p> : <p>No Reviews</p>}
        <UserReview product={product} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default SingleProduct;
