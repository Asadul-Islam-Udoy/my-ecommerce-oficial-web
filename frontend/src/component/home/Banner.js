import React, { useEffect, useState } from "react";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { homeBannerGetAction } from "../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import Lodder from "../lodder/Lodder";
function Banner() {
  const [c_image, setc_image] = useState(1);
  const dispatch = useDispatch();

  const { lodding, banners } = useSelector((state) => state.bannerStore);

  useEffect(() => {
    dispatch(homeBannerGetAction());
  }, []);
  useEffect(() => {
    const times = setInterval(() => {
      setc_image((pre) => pre + 1);
    }, 10000);
  }, [setc_image]);
  if (banners[0]?.productBanner?.length === c_image) {
    setc_image(0);
  }
  return (
    <>
      {lodding ? (
        <Lodder />
      ) : (
        <div className="banner__image__container">
          <div className="banner__image__box">
            {lodding && (
              <div className="banner__contan">
                <h3>24 Best Ecommerce Quotes for Digital Sellers</h3>
                <p className="hotchful">HOTCHFUL</p>
                <p className="well__come">
                  Well Come! Everyone This is Web Side{" "}
                </p>
              </div>
            )}
            {banners[0]?.productBanner
              ?.slice(c_image, c_image + 1)
              .map((item, index) => (
                <img
                  loading="true"
                  src={`https://my-ecommerce-oficial-web.onrender.com/images/banners/${item.banner}`}
                  alt={index}
                />
              ))}

            <div className="banner__button">
              <p onClick={() => setc_image((pre) => pre - 1)}>
                <ArrowBackIosIcon />
              </p>
              <p onClick={() => setc_image((pre) => pre + 1)}>
                <ArrowForwardIosIcon />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
