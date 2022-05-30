import React from "react";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./footer";

class Contact extends React.Component {
  render() {
    return (
      <div id="contact">
        <br />
        <h1>
          <i>Contact Us</i>
        </h1>
        <p>We are here to help you</p>

        <div className="container">
          <div className="row">
            <div className="col-md-8" id="faq">
              <h4>Any Queiries??</h4>
              <form>
                <textarea
                  type="text"
                  placeholder="Write your Query"
                  style={{ width: "80%" }}
                ></textarea>
                <br />
                <button className="button">Submit</button>
              </form>
              <br />
              <h4>FAQ's</h4>
              <ul id="faq">
                <li>What is Try and Buy Service?</li>
                <li>
                  Why are there different prices for the same product? Is it
                  legal?
                </li>
                <li>
                  I saw the product at Rs. 1000 but post clicking on the
                  product, there are multiple prices and the size which I want
                  is being sold for Rs. 1600. Why is there a change in price in
                  the product description page?
                </li>
                <li>
                  How will I detect fraudulent emails/calls seeking sensitive
                  personal and confidential information?
                </li>
                <li>How will I identify a genuine appointment letter?</li>
                <li>Why will 'My Cashback' not be available on E$!Te?</li>
                <li>How do I cancel the order, I have placed?</li>
                <li>How do I create a Return Request?</li>
                <li>
                  I have created a Return request. When will the product be
                  picked up?
                </li>
                <li>
                  I have created a Return request. When will I get the refund?
                </li>
                <li>Where should I self-ship the Returns?</li>
                <li>
                  I have accumulated E$!Te Points in my account. How can I
                  redeem them?
                </li>
              </ul>
            </div>

            <div className="col-md-3" id="left">
              <p>
                <strong>Toll free number: </strong>800-223-2500
              </p>
              <p>
                <strong>Email Id: </strong>esite@org.in
              </p>
              <p>
                <strong>Facebook: </strong>E$!Te
              </p>
              <p>
                <strong>Instagram: </strong>E$!Te_official
              </p>
              <p>
                <strong>Youtube: </strong>E$!Te-Electronics
              </p>
              <p>
                <strong>Twitter: </strong>@E$!Te
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Contact;
