import React from "react";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";
import Footer from "./footer";
import "bootstrap/dist/css/bootstrap.css";
class About extends React.Component {
  render() {
    return (
      <div id="about">
        <section className="static-renren clear cf">
          <div className="eyc-header">
            <h1 id="big">E$!Te</h1>
          </div>

          <article className="eyc-page">
            <div className="eyc-title">
              <h1>Equip Your Creativity</h1>

              <section className="eyc-points">
                <div className="eyc-point">
                  <h2>Our Mission</h2>
                  <p>
                    We believe everyone is a creator. Our mission is to inspire,
                    educate and equip to make dreams a reality.
                  </p>
                </div>
                <div className="eyc-point">
                  <h2>Our Vision</h2>
                  <p>
                    Be an integral part of every creator's success&nbsp;story.
                  </p>
                </div>
                <div className="eyc-point">
                  <h2>Our Pledge</h2>
                  <p>
                    Keep you inspired and connected to our pros and your peers.
                  </p>
                </div>
              </section>
            </div>

            <section className="eyc-your-way">
              <h3>We See It Your Way</h3>
              <p>
                If you're going to manifest your creative vision, you need the
                right equipment. At E$!Te, our store has been an icon for New
                York City's creatives since 1974. Read more about our history.
              </p>
              <p>
                Shop E$!Te for a powerhouse lineup of mobiles, laptops,
                televisions, audio devices and every cutting-edge accessory.
              </p>
              <Link to={{ pathname: "/Categories" }}>
                <button className="button">Shop Now</button>
              </Link>
            </section>

            <section className="eyc-more">
              <h3>More Than Meets the Eye</h3>
              <p>
                Your art is our passion, and we are here to supply you with
                state-of-the-art equipment and the significant support of people
                who want you to succeed.
              </p>
              <button className="button">Learn More At 42 West</button>
            </section>

            <section className="eyc-promise">
              <h3>The E$!Te Promise</h3>
              <p className="eyc-subtitle">
                We're here for you with the best in mobile, television, and
                audio, plus complete customer service, tailored to your every
                need.
              </p>

              <div className="eyc-promise-list">
                <div className="eyc-promise-item">
                  <h4>Buy Online</h4>
                  <p>
                    Get deep details on equipment. Learn, compare, and hear from
                    pros. Read reviews and ask questions.
                  </p>
                </div>
                <div className="eyc-promise-item">
                  <h4>Shop In Store</h4>
                  <p>
                    Test the devices. Get specs and recommendations from our
                    kind, knowledgeable staff. Visit our NYC store.
                  </p>
                </div>
                <div className="eyc-promise-item">
                  <h4>Earn Rewards</h4>
                  <p>
                    Shopping at E$!Te is always rewarding with our point-based
                    loyalty program, and even more perks with our VIP360
                    membership.
                  </p>
                </div>
                <div className="eyc-promise-item">
                  <h4>Connect with Us</h4>
                  <p>
                    You can chat with us on our site, on social media, and
                    during our live in-store events.
                  </p>
                </div>
                <div className="eyc-promise-item">
                  <h4>Get Support</h4>
                  <p>
                    In the unlikely event of an issue with your order or if you
                    have questions, we're here for you. Call us at{" "}
                    <a href="tel:8002232500">800-223-2500</a> or{" "}
                    <a href="/Contact">email</a> us anytime.{" "}
                  </p>
                </div>
              </div>
            </section>

            <section className="eyc-brands">
              <div className="eyc-brand-list lazy-observed">
                <div className="eyc-brand-item">
                  <div id="himg">
                    <h4 id="himg">
                      <img
                        alt="E$!Te Business Solutions"
                        src="https://www.adorama.com/col/UIimages/equip-your-creativity/about-abs.jpg"
                      ></img>
                    </h4>
                  </div>
                  <p>
                    E$!Te's B2B division provides consultative sales and
                    technical services to design, install and support the unique
                    technology needs of businesses, educational institutions and
                    government agencies.
                  </p>
                  <p>Learn More</p>
                </div>

                <div className="eyc-brand-item">
                  <div id="himg">
                    <h4 id="himg">
                      <img
                        alt="E$!Te Rental Co"
                        src="https://www.adorama.com/col/UIimages/equip-your-creativity/about-arc.jpg"
                      ></img>
                    </h4>
                  </div>
                  <p>
                    You can rent professional filmmaking equipment and audio
                    gear from the E$!Te Rental Co. in Manhattan or Brooklyn. Get
                    what you need for the duration of your project. Renting is
                    also a great way to test out gear before you buy.
                  </p>
                  <p>Start Renting</p>
                </div>

                <div className="eyc-brand-item">
                  <div id="himg">
                    <h4 id="himg">
                      <img
                        alt="Adorama Trade &amp; Used"
                        src="https://www.adorama.com/col/UIimages/equip-your-creativity/about-trade.jpg"
                      ></img>
                    </h4>
                  </div>
                  <p>
                    We pay top dollar for your used photo and video equipment.
                    If you are ready to upgrade your system or you have
                    equipment that you would like to turn into cash, we're here
                    to help with a wide selection, accurate ratings, and
                    industry experts to assist.
                  </p>
                  <p>Learn More</p>
                </div>

                <div className="eyc-brand-item">
                  <div id="himg">
                    <h4>
                      <img
                        alt="Printique, Previously AdoramaPix"
                        src="https://www.adorama.com/col/UIimages/equip-your-creativity/about-printique.jpg"
                      ></img>
                    </h4>
                  </div>
                  <p>
                    We produce pro-quality prints with excellent white-glove
                    service, all at an affordable price.{" "}
                  </p>
                  <p>Get Started</p>
                </div>

                <div className="eyc-brand-item">
                  <div id="himg">
                    <h4 id="himg">
                      <img
                        alt="42 West"
                        src="https://www.adorama.com/col/UIimages/equip-your-creativity/about-42-west.jpg"
                      ></img>
                    </h4>
                  </div>
                  <p>
                    Empower your creativity with tips, tricks, and inspiration
                    from our pros. Renowned directors, photographers, and audio
                    professionals share their expertise with you in our blog.
                    Get reviews, recommendations, and event invites.
                  </p>
                  <p>Read More</p>
                </div>

                <div className="eyc-brand-item">
                  <div id="himg">
                    <img
                      role="presentation"
                      src="https://www.adorama.com/col/UIimages/equip-your-creativity/about-jobs.jpg"
                    ></img>
                    <h4>
                      <span>Working at E$!Te</span>
                    </h4>
                  </div>
                  <p>
                    Join us as we support creatives around the world with
                    equipment sales, rentals, and education. We work in New York
                    and New Jersey and serve customers around the world.
                  </p>
                  <p>See open positions</p>
                </div>
              </div>
            </section>
          </article>
        </section>
        <br />
        <Footer />
      </div>
    );
  }
}

export default About;
