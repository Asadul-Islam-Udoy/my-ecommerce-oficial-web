import React, { useEffect, useState } from "react";
import "../categories/home/ProductCategory.css";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Stack, Typography, Slider, TextField } from "@mui/material";
import Navber from "./Navber";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Rating from "@mui/material/Rating";
import Footer from "./Footer";
import { GetAllProductAciton } from "../../actions/ProductAction";
import Lodder from "../lodder/Lodder";
function AllProducts() {
  const alert = useAlert();
  const { slug } = useParams();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { lodding, error, products } = useSelector(
    (state) => state.getAllProducts
  );
  const [pagination, setPagination] = useState(1);
  const [nextP, setNextP] = useState(0);
  const [preP, setPreP] = useState(0);
  const [counts, setCounts] = useState(0);
  const [initionCount, setInitionCount] = useState(10);
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
  console.log("range", priceRangeValue);
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
      setInitionCount(initionCount + 10);
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
        setInitionCount(initionCount - 10);
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
    dispatch(GetAllProductAciton(keyword, priceRangeValue));
  }, [dispatch, keyword, priceRangeValue]);
  return (
    <>
      {lodding && <Lodder />}
      <div>
        <Navber />
      </div>
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
            ?.slice(pagination * 10 - 10, pagination * 10)
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
                    <p
                      style={{
                        marginTop: "-13px",
                        margin: "3px",
                        fontSize: "15px",
                      }}
                    >
                      {item.description.substring(0, 60)}...
                    </p>
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
            style={{ backgroundColor: `${item === pagination ? "gray" : ""}` }}
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
    </>
  );
}

export default AllProducts;
