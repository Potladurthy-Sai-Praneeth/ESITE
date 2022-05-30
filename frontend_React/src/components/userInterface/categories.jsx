import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";

function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startShowingLoading,
      startHidingLoading,
    },
    dispatch
  );
}

class Categories extends React.Component {
  render() {
    return (
      <div id="appjs">
        <div className="container">
          <div className="row mt-5 categories" id="row">
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "mobiles",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1605338848/Croma%20Assets/Communication/Mobiles/Images/8943200370718.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Mobiles</h5>
                    <p className="card-text text-muted">
                      Apple | OnePlus | Oppo | Vivo | Realme | Redmi | Samsung |
                      Xiaomi | Accessories |
                    </p>
                    <p>Range : ₹8,000-₹1,00,000</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "laptops",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1606585888/Croma%20Assets/Computers%20Peripherals/Laptop/Images/9009479057438.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Laptops</h5>
                    <p className="card-text text-muted">
                      Apple | Dell | Lenovo | MSI | Realme | Redmi | Hp | Xiaomi
                      | Accessories | Chargers
                    </p>
                    <p>Range : ₹23,000-₹3,13,000</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "televisions",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1618815413/Croma%20Assets/Entertainment/Television/Images/233048_gkqaqe.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Televisons</h5>
                    <p className="card-text text-muted">
                      Sony | OnePlus | Videocon | LG | Realme | Redmi | Samsung
                      | Accessories
                    </p>
                    <p>Range : ₹10,000-₹1,50,000</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "microwave",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1605176066/Croma%20Assets/Small%20Appliances/Microwave%20or%20OTG/Images/8857828655134.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">MicroWave Ovens</h5>
                    <p className="card-text text-muted">
                      IFB | Philips | Panasonic | LG | Samsung | Sony |
                      Whirlpool | Accessories
                    </p>
                    <p>Range : ₹17,000-₹70,000</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="row mt-10 categories">
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "audio",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/h_300,w_300/v1618643664/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/234148_w6ev9x.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Audio</h5>
                    <p className="card-text text-muted">
                      Apple | OnePlus | Realme | Redmi | Samsung | Boat |
                      Accessories |
                    </p>
                    <p>Range : ₹900-₹20,000</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "refrigerators",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1616401791/Croma%20Assets/Large%20Appliances/Refrigerator/Images/231744_xgxh8k.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Refrigerators</h5>
                    <p className="card-text text-muted">
                      IFB | Philips | Panasonic | LG | Samsung | Sony |
                      Whirlpool | Accessories
                    </p>
                    <p>Range : ₹10,000-₹1,40,000</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "washing machines",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1605157814/Croma%20Assets/Large%20Appliances/Dryers/Images/8989620437022.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Washing Machines</h5>
                    <p className="card-text text-muted">
                      IFB | Bosch | Panasonic | LG | Samsung | Sony | Whirlpool
                      | Accessories
                    </p>
                    <p>Range : ₹8000-₹1,00,000</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={{
                  pathname: "/ProductList",
                  category: "air conditioners",
                }}
                style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  onClick={() => {
                    this.props.startShowingLoading();
                    setTimeout(() => {
                      this.props.startHidingLoading();
                    }, 1100);
                  }}>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1605262568/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/9000230748190.png"
                    className="card-img-top"
                    alt="mobiles"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Air Conditioners</h5>
                    <p className="card-text text-muted">
                      Ogeneral | Hitachi | Onida | Daikin | IFB | Bosch |
                      Samsung | Accessories
                    </p>
                    <p>Range : ₹26,000-₹1,00,000</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
