import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="footer__container">
        <div className="footer__boxs">
          <div className=" footer__box footer__box_1">
            <div className="footer__box__1__left">
              <p>Content</p>
              <Link>Calendar of festivities</Link>
              <Link>New assets</Link>
              <Link>The most popular content</Link>
              <Link>Search trends</Link>
              <Link>Blog</Link>
            </div>
            <div className="footer__box__1__center">
              <p>INFORMATION</p>
              <Link>Pricing</Link>
              <Link>About us</Link>
              <Link>Press room</Link>
              <Link>Api</Link>
              <Link>Job</Link>
            </div>
            <div className="footer__box__1__center__1">
              <p>LEGAL</p>
              <Link>Terms of use</Link>
              <Link>License agreement</Link>
              <Link>Privacy information</Link>
              <Link>Copyright information</Link>
              <Link>Cookie policy</Link>
            </div>
            <div className="footer__box__1__right">
              <p>SOCIAL MEDIA</p>
              <div>
                <Link to="https://www.facebook.com">
                  <img
                    src="https://image.similarpng.com/very-thumbnail/2020/12/Popular-Facebook-icon-in-round-black-color-on-transparent-background-PNG.png"
                    alt="im"
                  />
                </Link>
                <Link>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpG1tvzv0EAOpwD5aHrduAkAM-A-7kZUweqsKT3vCdNwnYJeW_EY9dMyWyU_msjCAFSkU&usqp=CAU"
                    alt="im"
                  />
                </Link>
                <Link to="https://www.youtube.com">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0Sr3EXfFa0kChCM1dXVmlwB_-dfUtfm8eTdzZ4g08vvcaRWHLGliASgQuoZxRLM7wSQ&usqp=CAU"
                    alt="im"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className=" footer__box footer__box__2">
            <div className="footer__box__2__left">
              <img
                src="https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/11e0719e75e67bbeafcfce50b1b0ceb4.svg"
                alt="im"
              />
              <p>
                Copyright © 2010-2023 Freepik Company S.L. Tutti i diritti
                riservati
              </p>
            </div>
          </div>
          <div className="footer__box footer__box__3">
            <div className="footer__box__3__left">
              <p>Progetti di Freepik Company</p>
            </div>
            <div className="footer__box__3__right">
              <Link style={{ color: "gray" }}>Freepik</Link>
              <Link>Flaticon</Link>
              <Link> Slidesgo</Link>
              <Link>Wepik</Link>
              <Link>Videvo</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
