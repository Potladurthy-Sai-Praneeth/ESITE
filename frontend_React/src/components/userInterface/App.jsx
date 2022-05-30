import React,{Suspense} from "react";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import AppFiltered from "./appFiltered";

import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fallback from "./fallback";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [
        "mobiles",
        "laptops",
        "televisions",
        "microwave",
        "audio",
        "refrigerators",
        "washing machines",
        "air conditioners",
      ],
      allFiltered: [],
      startIndex: 0,
    };
  }
  
  render() {
   
    return (
      <div id="appjs">
       
        <div className="carousel">
          <Carousel variant="dark" className="carousel">
            <Carousel.Item id="carousel">
              <img
                className="d-block w-10000"
                src="https://c4.wallpaperflare.com/wallpaper/480/637/263/headphones-typography-colorful-wallpaper-preview.jpg"
                alt="First slide"
                id="carousel"
              />
            </Carousel.Item>
            <Carousel.Item id="carousel">
              <img
                className="d-block w-10000"
                src="https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="Second slide"
                id="carousel"
              />
            </Carousel.Item>
            <Carousel.Item id="carousel">
              <img
                className="d-block w-10000"
                src="https://c1.wallpaperflare.com/preview/967/879/785/phone-apple-iphone-airpod.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div>  
            <AppFiltered asked="mobiles" />         
            <AppFiltered asked="laptops" />         
            <AppFiltered asked="televisions" />         
            <AppFiltered asked="microwave" />         
            <AppFiltered asked="audio" />         
            <AppFiltered asked="refrigerators" />         
            <AppFiltered asked="washing machines" />         
           <AppFiltered asked="air conditioners" />
        </div>
        <div className="footer">
          <div className="footer-blue">
            <label className="footer-blue-text">
              Equipping your creativity, since 1974. Read <u>our story.</u>
            </label>
          </div>
          <div className="footer-dark-gray">
            <div className="row">
              <div className="col-md-3">
                <a href="#">800-223-2500</a>
              </div>
              <div className="col-md-3">
                <a href="#">Help Center</a>
              </div>
              <div className="col-md-3">
                <a href="#">NYC Store Hours</a>
              </div>
              <div className="col-md-3">
                <a href="#">Live Chat</a>
              </div>
            </div>
          </div>
          <div className="footer-light-gray">
            <div className="row">
              <div className="col-md-4 ">
                <p>
                  <strong>How Are We Doing?</strong>
                </p>
                <p>Your opinions and comments are valuable to us.</p>
                <p>We'd love to get your feedback!</p>
                <br />
                <p>
                  <strong>Connect with Us</strong>
                </p>
                <div className="fav-icons">
                  <Link to={{ pathname: "/Contact" }}>
                    {/* <a href="#" className="fa fa-facebook fa-2x"></a> */}
                    <FontAwesomeIcon size="2x" icon={faFacebook} />
                  </Link>
                  <Link to={{ pathname: "/Contact" }}>
                    {/* <a href="#" className="fa fa-linkedin  fa-2x"></a> */}
                    <FontAwesomeIcon size="2x" icon={faLinkedin} />
                  </Link>
                  <Link to={{ pathname: "/Contact" }}>
                    {/* <a href="#" className="fa fa-twitter  fa-2x"></a> */}
                    <FontAwesomeIcon size="2x" icon={faTwitter} />
                  </Link>
                  <Link to={{ pathname: "/Contact" }}>
                    {/* <a href="#" className="fa fa-instagram  fa-2x"></a> */}
                    <FontAwesomeIcon size="2x" icon={faInstagram} />
                  </Link>
                  <Link to={{ pathname: "/Contact" }}>
                    {/* <a href="#" className="fa fa-youtube  fa-2x"></a> */}
                    <FontAwesomeIcon size="2x" icon={faYoutube} />
                  </Link>
                </div>
              </div>
              <div className="col-md-4 ">
                <p>
                  <strong>From 42West</strong>
                </p>
                <p>
                  Bringing you great new articles, posts and fresh content to
                  equip your creativity.
                </p>
                <p>
                  <a href="#"> View More Stories…</a>
                </p>
              </div>
              <div className="col-md-4 ">
                <p>
                  <strong>Stay in the Know</strong>
                </p>
                <p>
                  Get exclusive access to expert tips, special offers and
                  coupons.
                </p>
                <div className="input-group email">
                  <input
                    type="text"
                    id="email"
                    className="form-control-sm"
                    placeholder="Email Address"
                    aria-label="text"
                    aria-describedby="basic-addon2"
                  />
                  <Link to="/MyAccount">
                    <button
                      className="input-group-append btn btn-primary btn-sm"
                      id="basic-addon2">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-images">
            <div className="row">
              <div className="col-md-3 ">
                <ul>
                  <li>
                    <label className="link-heading"> Who We Are</label>
                  </li>
                  <Link to={{ pathname: "/About" }}>
                    <li> About US</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li>Our History</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Reviews</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li>Map & Directions</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Events</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Learning Center</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Gift Cards</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Brands </li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Affiliate Program </li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li> Careers</li>
                  </Link>
                  <Link to={{ pathname: "/About" }}>
                    <li>Creator Highlights</li>
                  </Link>
                </ul>
              </div>
              <div className="col-md-3">
                <ul>
                  <li>
                    <label className="link-heading">Special Programs</label>
                  </li>

                  <a href="#">
                    <li> Corporate</li>
                  </a>
                  <a href="#">
                    <li>Education</li>
                  </a>
                  <a href="#">
                    <li>Government</li>
                  </a>
                  <a href="#">
                    <li>Access Business Support</li>
                  </a>
                  <a href="#">
                    <li>E$!Te Platinum Credit Card</li>
                  </a>
                  <a href="#">
                    <li>Rewards</li>
                  </a>

                  <a href="#">
                    <li>Students</li>
                  </a>
                </ul>
                <br />
                <ul>
                  <li>
                    <label className="link-heading">More Services</label>
                  </li>
                  <a href="#">
                    <li>Photo Printing</li>
                  </a>
                  <a href="#">
                    <li> Rentals</li>
                  </a>
                  <a href="#">
                    <li>Sell Used Equipment</li>
                  </a>
                </ul>
              </div>
              <div className="col-md-3">
                <ul>
                  <li>
                    <label className="link-heading "> How Can We Help?</label>
                  </li>

                  <a href="#">
                    <li>Customer Service</li>
                  </a>
                  <a href="#">
                    <li>Track Your Order</li>
                  </a>
                  <a href="#">
                    <li>Shipping & Delivery</li>
                  </a>
                  <a href="#">
                    <li>In-Store Pickup</li>
                  </a>
                  <a href="#">
                    <li>International Orders</li>
                  </a>
                  <a href="#">
                    <li>Return Policy</li>
                  </a>
                  <Link to={{ pathname: "/Contact" }}>
                    <li>Contact Us</li>
                  </Link>
                  <a href="#">
                    <li>Warranties</li>
                  </a>
                </ul>
              </div>
              <div className="col-md-3 map-point">
                <div>
                  <img
                    src="https://www.adorama.com/col/UIimages/footer-store-pin-ado.png"
                    href="#"
                  />
                </div>
                <div>
                  <p>
                    <strong>Visit E$!Te</strong>
                  </p>
                  <p>
                    Come visit our New York City store in the Flatiron/Chelsea
                    district.
                  </p>
                  <p>
                    <a href="#"> Location & Store Hours</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-6 certificates">
                <img
                  src="https://adorama.com/artworks2/bbbseal3.gif"
                  href="#"
                  className="certificates-images"
                />
                <img
                  src="https://medals.bizrate.com/medals/dynamic/22495_medal.gif"
                  href="#"
                  className="certificates-images"
                />
                <img
                  src="https://medals.bizrate.com/awards/horizontal/22495_coe.gif"
                  href="#"
                  className="certificates-images"
                />
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          <div className="footer-blue">
            <label className="footer-blue-text">
              Copyright E$!Te, Inc. All rights reserved. •Privacy Policy •Terms
              of Use
              <br />
              42 West 18th Street New York, NY 1000011 (directions) •
              800.223.2500
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
