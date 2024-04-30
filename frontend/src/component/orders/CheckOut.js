import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import Navber from "../home/Navber";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckHeader from "./CheckHeader";
import { useDispatch, useSelector } from "react-redux";
import { ProductSingleAction } from "../../actions/ProductAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Footer from "../home/Footer";
import {
  AddToCardAction,
  DeleteCartItemAction,
} from "../../actions/OrderAction";
function CheckOut() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.singleProduct);
  const { cartItems } = useSelector((state) => state.card);
  const quantityIncrementHandler = (id, quantity, colors, sizes, stock) => {
    if (quantity >= stock) {
      return;
    }
    const newQ = quantity + 1;
    dispatch(AddToCardAction(id, newQ, colors, sizes));
  };

  const quantityDecrementHandler = (id, quantity, colors, sizes) => {
    if (quantity < 1) {
      return;
    }
    const newQ = quantity - 1;
    dispatch(AddToCardAction(id, newQ, colors, sizes));
  };
  useEffect(() => {
    dispatch(ProductSingleAction(id));
  }, [id]);
  const chackHandler = () => {
    navigate("/shipping");
  };
  let total = 0;
  cartItems?.forEach((element) => {
    total += element.price * element.quantity;
  });
  const deleteCartHandler = (id) => {
    dispatch(DeleteCartItemAction(id));
  };

  return (
    <>
      <div style={{ marginTop: "-10px" }}>
        <Navber />
      </div>
      {cartItems?.length > 0 ? (
        <div className="checkout__container">
          <div>
            <CheckHeader activeState={0} />
            <div>
              <div className="checkout__box__1">
                {cartItems?.map((item) => (
                  <div>
                    <div>
                      <img
                        src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImage}`}
                        alt="images"
                      />
                      <p>{item.name}</p>
                      <span style={{ margin: "3px" }}>{item.quantity}</span>
                      <span>x</span>
                      <span>{item.price}</span>
                      <span>=</span>
                      <span>
                        <b>${item.quantity * item.price}</b>
                      </span>
                    </div>
                    <div>
                      <div
                        title="delete"
                        className="checkout__delete__product"
                        onClick={() => deleteCartHandler(item.product)}
                      >
                        <HighlightOffIcon />
                      </div>
                      <div>
                        <div className="quantity__section__checkout">
                          <button
                            onClick={() =>
                              quantityDecrementHandler(
                                item.product,
                                item.quantity,
                                item.colors,
                                item.sizes
                              )
                            }
                          >
                            -
                          </button>
                          <div>
                            <input readOnly value={item.quantity} />
                            <div className="quantity__overflow">
                              <div>
                                {[...Array(product?.stock).keys()].map((i) => (
                                  <span>{i + 1}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              quantityIncrementHandler(
                                item.product,
                                item.quantity,
                                item.colors,
                                item.sizes,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="size__width">
                      <div>
                        <div>
                          <span>
                            <b>width</b>
                          </span>
                          <span style={{ display: "none" }}>:</span>
                          <span>{item.width} ft</span>
                        </div>
                        <div>
                          <span>
                            <b>height</b>
                          </span>
                          <span style={{ display: "none" }}>:</span>
                          <span>{item.height} ft</span>
                        </div>
                        <div>
                          <span>
                            <b>colors</b>
                          </span>
                          <span style={{ display: "none" }}>:</span>
                          <span>
                            {item.colors.map((i) => (
                              <span>{i},</span>
                            ))}
                          </span>
                        </div>
                        <div>
                          <span>
                            <b>sizes</b>
                          </span>
                          <span style={{ display: "none" }}>:</span>
                          <span>
                            {item.sizes.map((i) => (
                              <span>{i},</span>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout__box__2">
                <div>
                  <div>
                    <span>Item</span>
                    <br />
                    <span>{cartItems?.length}</span>
                  </div>
                  <div>
                    <span>Total Price</span>
                    <br />
                    <span>${total} </span>
                  </div>
                </div>
                <div>
                  <button onClick={chackHandler}>CheckOut</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no__cartItem_section">
          <div>
            <RemoveShoppingCartIcon className="no__item__icon" />
            <p>No Card Items</p>
            <Link to="/all/products">
              <button>View Products</button>
            </Link>
          </div>
        </div>
      )}
      <div className="footer__class">
        <Footer />
      </div>
    </>
  );
}

export default CheckOut;
