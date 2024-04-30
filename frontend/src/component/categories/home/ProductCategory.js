import React, { useEffect, useState } from "react";
import "./ProductCategory.css";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Stack, Typography, Slider, TextField } from "@mui/material";
import Navber from "../../home/Navber";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryProductAction } from "../../../actions/ProductAction";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Footer from "../../home/Footer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Rating from "@mui/material/Rating";
function ProductCategory() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { lodding, error, products } = useSelector(
    (state) => state.categoryBasicProduct
  );
  const [pagination, setPagination] = useState(1);
  const [nextP, setNextP] = useState(0);
  const [preP, setPreP] = useState(0);
  const [counts, setCounts] = useState(0);
  const [initionCount, setInitionCount] = useState(3);
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(10000);
  const minmin = 0;
  const maxmax = 10000;
  const [priceRangeValue, setPriceRangeValue] = useState([0, 10000]);
  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };
  let arrayList = [];
  [...Array(20).keys()].forEach((element) => {
    arrayList.push(element + 1);
  });
  const panginationHandler = (item) => {
    setPagination(item);
    setNextP(item);
    setPreP(item);
  };
  const nextHandler = () => {
    if (pagination !== arrayList.length) {
      setPagination(pagination + 1);
      setNextP(nextP + 1);
      setPreP(preP + 1);
    }
    if (initionCount === pagination) {
      setInitionCount(initionCount + 3);
      setCounts(counts + 3);
    }
  };
  const preHandler = () => {
    if (pagination !== 0) {
      setPagination(pagination - 1);
      setNextP(nextP - 1);
      setPreP(preP - 1);
    }
    if (pagination !== 0) {
      if (pagination === counts) {
        setInitionCount(initionCount - 3);
        setCounts(counts - 3);
      }
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [alert, error]);

  useEffect(() => {
    dispatch(GetCategoryProductAction(id));
  }, [dispatch, id]);
  return (
    <>
      <div>
        <Navber />
      </div>
      {products.length >= 0 ? (
        <div className="no__category__products">
          <div>
            <DoNotDisturbIcon className="no__category__icon" />
          </div>
          <h2>
            <KeyboardBackspaceIcon
              onClick={() => navigate(-1)}
              className="no__category__left__icon"
            />
            NO CATEGORY PRODUCT
          </h2>
        </div>
      ) : (
        <div>
          <div
            className="paroduct__category__container"
            style={{ minHeight: "80vh", paddingTop: "70px" }}
          >
            <div className="category__left">
              <div className="price__range">
                <p>Price Range</p>
                <div>
                  <Box sx={{ width: 180 }}>
                    <Slider
                      getAriaLabel={() => "Price range"}
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                      valueLabelDisplay="auto"
                      min={minmin}
                      max={maxmax}
                    />
                    <Stack
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <TextField
                        label="min"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "90px" }}
                        value={minNum}
                        onChange={(e) => {
                          setMinNum(Number(e.target.value));
                          setPriceRangeValue([
                            Number(e.target.value),
                            priceRangeValue[1],
                          ]);
                        }}
                      />
                      <Typography>-</Typography>
                      <TextField
                        label="max"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "90px" }}
                        value={maxNum}
                        onChange={(e) => {
                          setMaxNum(Number(e.target.value));
                          setPriceRangeValue([
                            priceRangeValue[0],
                            Number(e.target.value),
                          ]);
                        }}
                      />
                    </Stack>
                  </Box>
                </div>
              </div>
            </div>
            <div className="product__category__section">
              {products
                ?.slice(pagination * 3 - 3, pagination * 3)
                .map((item) => (
                  <div>
                    <div className="product__category__box">
                      <Link to={`/category/single/${slug}/${item._id}`}>
                        <img
                          src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImages[0].image}`}
                        />
                      </Link>
                      <div>
                        <p>{item.name}</p>
                        <span>
                          <Rating
                            name="read-only"
                            value={item.ratings}
                            readOnly
                            size="large"
                          />
                        </span>
                        <div className="category__price">
                          <p className="price__section">
                            <b>${item.price}</b>
                          </p>
                          <p>{item.offer}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="pagination__section">
            {pagination !== 0 && (
              <span onClick={preHandler}>
                <ArrowLeftIcon style={{ fontSize: "16px" }} />
                pre
              </span>
            )}
            {arrayList.slice(counts, initionCount).map((item) => (
              <span
                style={{
                  backgroundColor: `${item === pagination ? "gray" : ""}`,
                }}
                onClick={() => panginationHandler(item)}
              >
                {item}
              </span>
            ))}
            {pagination !== arrayList.length && (
              <span onClick={nextHandler}>
                next
                <ArrowRightIcon style={{ fontSize: "16px" }} />
              </span>
            )}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCategory;
