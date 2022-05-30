import "bootstrap/dist/css/bootstrap.css";
import React, { Fragment } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavLink,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";
import "./../../index.css";
import { bindActionCreators } from "redux";
import { startDeletingAllCart } from "../actions/actions";
import { startDeletingAllWishlist } from "../actions/actions";
import { resetUser } from "../actions/actions";
import { startGettingIndividualUser } from "../actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";
import {
  faShoppingCart,
  faUser,
  faHome,
  faHeart,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Profile from "./profile";

function mapStateToProps(state) {
  return {
    user: state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetUser,
      startDeletingAllCart,
      startDeletingAllWishlist,
      startGettingIndividualUser,
      startShowingLoading,
      startHidingLoading,
    },
    dispatch
  );
}
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      user: this.props.user.user,
    };
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" className="navigation navbar">
          <Container className="navi-container">
            <Navbar.Brand to="/" as={Link} id="route" className="brand">
              E$!Te
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">
                <NavLink to="/Home" as={Link} id="route">
                  Home
                </NavLink>

                <NavLink as={Link} to="/Categories" id="route">
                  Categories
                </NavLink>
                {this.props.user.isLoggedIn ? null : (
                  <NavLink to="/Login" as={Link} id="route">
                    Admin
                  </NavLink>
                )}
              </Nav>
              <Form className="d-flex">
                <FormControl
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  type="search"
                  id="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={(event) => {
                    let val = event.target.value;
                    this.setState({ search: val });
                  }}
                />
                <Link
                  to={{
                    pathname: "/ProductList",
                    category: this.state.search,
                  }}>
                  <button
                    id="search-button"
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      this.props.startShowingLoading();
                      setTimeout(() => {
                        this.props.startHidingLoading();
                      }, 1100);
                    }}>
                    <i className="fa fa-search"></i>
                    <FontAwesomeIcon icon={faSearch} size="1x" />
                  </button>
                </Link>
              </Form>
              <NavLink
                to={this.props.user.isLoggedIn ? "/Wishlist" : "/Login"}
                as={Link}
                id="right"
                onClick={() => {
                  this.props.startShowingLoading();
                  setTimeout(() => {
                    this.props.startHidingLoading();
                  }, 1100);
                }}>
                <FontAwesomeIcon size="2x" icon={faHeart} />

                <small>Wishlist</small>
              </NavLink>
              {this.props.user.isLoggedIn ? (
                <Fragment>
                 
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-example"
                        menuVariant="light"
                        title={
                          <Fragment>
                           
                            <FontAwesomeIcon size="2x" icon={faUser} />
                            <small>{this.props.user.user}</small>
                          </Fragment>
                        }>
                        <NavDropdown.Item>
                          <NavLink
                            to={{
                              pathname: "/Profile",
                             
                            }}
                            as={Link}
                           >
                            Profile
                          </NavLink>
                        </NavDropdown.Item>

                        <NavDropdown.Item>
                          <NavLink to="/ForgotPassword" as={Link}>
                            Change Password
                          </NavLink>
                        </NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item
                          onClick={() => {
                            this.props.resetUser("SignIn");
                            setTimeout(() => {
                              window.location.reload();
                            }, 1000);
                          }}>
                          <NavLink to="/Home" as={Link}>
                            <FontAwesomeIcon size="1x" icon={faSignOutAlt} />
                            Logout
                          </NavLink>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Fragment>
              ) : (
                <NavLink
                  to="/MyAccount"
                  as={Link}
                  style={{ textDecoration: "none" }}
                  id="right">
                  <FontAwesomeIcon size="2x" icon={faUser} />
                  <small>{this.props.user.user}</small>
                </NavLink>
              )}

              <NavLink
                to={this.props.user.isLoggedIn ? "/Cart" : "/Login"}
                as={Link}
                id="right"
                onClick={() => {
                  this.props.startShowingLoading();
                  setTimeout(() => {
                    this.props.startHidingLoading();
                  }, 1100);
                }}>
                <FontAwesomeIcon size="2x" icon={faShoppingCart} />
              </NavLink>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
