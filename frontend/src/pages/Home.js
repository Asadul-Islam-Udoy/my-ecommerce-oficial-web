import React, { useEffect } from "react";
import "./Home.css";
import Navber from "../component/home/Navber";
import Banner from "../component/home/Banner";
import OfferProduct from "../component/home/OfferProduct";
import TopOfferProduct from "../component/home/TopOfferProduct";
import CategoriesProduct from "../component/home/CategoriesProduct";
import BestProduct from "../component/home/BestProduct";
import Footer from "../component/home/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeUniqueProductAction,
  OfferProductAction,
  getHomeCategoryAction,
} from "../actions/ProductAction";
import Lodder from "../component/lodder/Lodder";
import Title from "../component/helper/Title";
function Home() {
  const dispatch = useDispatch();
  const { lodding, error, products } = useSelector(
    (state) => state.homecategoryStore
  );

  useEffect(() => {
    dispatch(OfferProductAction());
    dispatch(getHomeCategoryAction());
    dispatch(HomeUniqueProductAction());
  }, [dispatch]);
  return (
    <>
      <div style={{}}>
        <Title title="Hotchful Home Page" />
        <Navber />
        <div>
          <Banner />
        </div>
        {lodding && <Lodder />}
        <div className="top__offer__product">
          <TopOfferProduct />
        </div>
        <div className="bestproduct">
          <BestProduct />
        </div>
        <div>
          <OfferProduct />
        </div>
        <div style={{ padding: "15px" }}>
          {products?.map((categoryItem) => (
            <CategoriesProduct categoryItem={categoryItem} />
          ))}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
