import React from "react";
import "./UserReview.css";
import Rating from "@mui/material/Rating";
function UserReview({ product }) {
  return (
    <>
      <div className="user__review__container">
        {product?.reviews?.map((item) => (
          <div className="c">
            <div className="user__review__box">
              <div>
                <img
                  src="https://img.freepik.com/premium-psd/character-avatar-3d-illustration_460336-702.jpg?size=626&ext=jpg&ga=GA1.1.1291529831.1679838217&semt=sph"
                  alt="avatar"
                />
                <p>{item.name}</p>
                <span style={{ marginTop: "-10px" }} className="review">
                  <Rating name="read-only" value={item.rating} readOnly />
                </span>
              </div>
              <div>
                <p>{item.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserReview;
