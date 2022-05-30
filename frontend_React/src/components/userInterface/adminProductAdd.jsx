import React from "react";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./footer";

class AdminProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      price: 0,
      content: "",
      category: "",
      image: "",
      popularity: "",
    };
  }
  render() {
    return (
      <div>
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ name: val });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupId">
            <Form.Label> Product Id</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ id: val });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ price: val });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupContent">
            <Form.Label> Product Content</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ content: val });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupImage">
            <Form.Label>Product Image URL</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ image: val });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCategory">
            <Form.Label> Product Category</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ category: val });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPopularity">
            <Form.Label> Product Popularity</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              onChange={(event) => {
                let val = event.target.value;
                this.setState({ popularity: val });
              }}
            />
          </Form.Group>
        </Form>
        <Link to={{ pathname: "/AdminProduct" }}>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => {
              this.props.dispatch(
                "ADD_PRODUCT",
                "http://localhost:8081/api/products",
                {
                  prodname: this.state.name,
                  id: this.state.id,
                  price: this.state.price,
                  content: this.state.content,
                  category: this.state.category,
                  image: this.state.image,
                  popularity: this.state.popularity,
                }
              );
            }}>
            Submit
          </button>
          <br />
        </Link>
        <br />
        <Footer />
      </div>
    );
  }
}

export default AdminProductAdd;