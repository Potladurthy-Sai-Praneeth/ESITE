import React from "react";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import Footer from "./footer";
import { Link } from "react-router-dom";
class AdminProductEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      req: this.props.indi,
      name: "",
      id: "",
      price: 0,
      content: "",
      category: "",
      image: "",
      popularity: "",
    };
  }
  componentDidMount() {
    this.setState({
      name: this.state.req.prodname,
      id: this.state.req.id,
      price: this.state.req.price,
      content: this.state.req.content,
      category: this.state.req.category,
      image: this.state.req.image,
      popularity: this.state.req.popularity,
    });
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={this.state.req.prodname}
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
              defaultValue={this.state.req.id}
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
              defaultValue={this.state.req.price}
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
              defaultValue={this.state.req.content}
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
              defaultValue={this.state.req.image}
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
              defaultValue={this.state.req.category}
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
              defaultValue={this.state.req.popularity}
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
            onClick={async () => {
              await this.props.dispatch(
                "EDIT_PRODUCT",
                `http://localhost:8081/api/updateProducts/${this.state.req._id}`,
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
      </div>
    );
  }
}

export default AdminProductEdit;
