import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ProductIndividual from "./productIndividual";
import "./../../Styling/App.css";
import Footer from "./footer";
import { bindActionCreators } from "redux";
import { startGettingRequestedProducts } from "../actions/actions";
import { connect } from "react-redux";
import Fallback from "./fallback";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startGettingRequestedProducts }, dispatch);
}
class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      category: this.props.location.category,
      sorBy: "Sort By",
      all: [],
    };
    this.props.startGettingRequestedProducts(
      `http://localhost:8081/api/products/${this.props.location.category}`
    );
    this.gatherData = this.gatherData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.filterByInput = this.filterByInput.bind(this);
    this.sortBy = this.sortBy.bind(this);
    
    this.fetchData();
  }

  sortBy(value)
  {
    
    switch (value)
    {
      case "Price - Lowest to Highest":
        {
          let inter = this.state.all.sort((a, b) => parseInt(a.price) - parseInt(b.price));
          this.setState({ filtered: inter,sorBy:value });
          break;
        }
      case "Price - Highest to Lowest":
        {
          let inter = this.state.all.sort((a, b) => parseInt(b.price) - parseInt(a.price));

          this.setState({ filtered: inter ,sorBy:value });
           break;
        }
      case "Alphabet - A-Z":
        {
          let inter = this.state.all.sort((a, b) => a.prodname.split(" ")[0].localeCompare(b.prodname.split(" ")[0], 'en', { sensitivity: 'base' }))

          this.setState({ filtered: inter,sorBy:value  });
           break;
        }
      case "Alphabet - Z-A":
        {
          let inter = this.state.all.sort((a, b) => b.prodname.split(" ")[0].localeCompare(a.prodname.split(" ")[0], 'en', { sensitivity: 'base' }))

          this.setState({ filtered: inter,sorBy:value  });
           break;
        }
      default:
        {
          this.setState({ filtered: [] });
        }
    }
  }

  filterByInput(value)
  {
    let filteredValues = this.state.all.filter(product => {
      return product.prodname.toLowerCase().includes(value);
    });
    this.setState({ filtered: filteredValues });
  }

  gatherData(count) {
    return <ProductIndividual data={this.state.all[count]} key={count} />;
  }
  async fetchData() {
    setTimeout(() => {
      this.setState({ all: this.props.store.requestedProducts });
    }, 1000);
  }
  render() {
    if (this.props.store.loading) return <Fallback />;
    return (
      <div >
        <div className="row">
            <div className="col-md-3" style={{alignItems: "center"}}>
                <select value={this.state.sorBy} onChange={(e)=>this.sortBy(e.target.value)}>
                  <option disabled>Sort By</option>
                  <option value="Price - Lowest to Highest">Price - Lowest to Highest</option>
                  <option value="Price - Highest to Lowest">Price - Highest to Lowest</option>
                  <option value="Alphabet - A-Z">Alphabet - A-Z</option>
                  <option value="Alphabet - Z-A">Alphabet - Z-A</option>
                </select>
            </div>
            <div className="col-md-4" style={{alignItems: "center"}}>
              <input style={{ width: "100%",marginTop:"8%"}} placeholder='Filter by' type='text' onChange={e => {this.filterByInput(e.target.value);}} />
          </div>
        </div>
          
        <div id="plp" className="productIndividual">
          {(this.state.all.length > 0 ? (
            <h1 className="display-4 text-center text-black mb-3 ">
              <i>{this.state.category}</i>
            </h1>
          ) : null)}
          <div>
            {(this.state.all.length > 0 && this.state.filtered.length > 0) ?
              this.state.filtered.map((el, index) => {
                return <ProductIndividual data={el} key={index} />;
              }) : ( (this.state.all.length > 0 && this.state.filtered.length === 0)? (
              this.state.all.map((el, index) => {
                return <ProductIndividual data={el} key={index} />;
              })
            ) : (
              <div>
                <h3 className="display-4 text-center text-black mb-3">
                  <p>
                    <i>Sorry, No Products found💥 </i>
                  </p>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <br />

        <Footer />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
