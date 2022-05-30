import "bootstrap/dist/css/bootstrap.css";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./components/store/store";
import Fallback from "./components/userInterface/fallback";
const App = lazy(() => import("./components/userInterface/App"));
const About = lazy(() => import("./components/userInterface/aboutus"));
const Admin = lazy(() => import("./components/userInterface/admin"));
const AdminProduct = lazy(() =>
  import("./components/userInterface/adminProduct")
);
const AdminProductAdd = lazy(() =>
  import("./components/userInterface/adminProductAdd")
);
const AdminProductEdit = lazy(() =>
  import("./components/userInterface/adminProductEdit")
);
const AdminProductIndividual = lazy(() =>
  import("./components/userInterface/adminProductIndividual")
);
const AdminUser = lazy(() => import("./components/userInterface/adminUser"));
const AdminUserIndividual = lazy(() =>
  import("./components/userInterface/adminUserIndividual")
);
const Cart = lazy(() => import("./components/userInterface/cart"));
const Categories = lazy(() => import("./components/userInterface/categories"));
const Checkout = lazy(() => import("./components/userInterface/checkout"));
const Contact = lazy(() => import("./components/userInterface/contact"));
const Header = lazy(() => import("./components/userInterface/header"));
const Login = lazy(() => import("./components/userInterface/login"));
const MyAccount = lazy(() => import("./components/userInterface/myAccount"));
const OrderSummary = lazy(() =>
  import("./components/userInterface/orderSummary")
);
const ProductDisplay = lazy(() =>
  import("./components/userInterface/productDisplay")
);
const ProductList = lazy(() =>
  import("./components/userInterface/productList")
);
const Profile = lazy(() => import("./components/userInterface/profile"));

const Wishlist = lazy(() => import("./components/userInterface/wishlist"));
const ForgotPassword = lazy(() =>
  import("./components/userInterface/forgotPassword")
);
const UpdatePassword = lazy(() =>
  import("./components/userInterface/updatePassword")
);
const ResetPassword = lazy(() =>
  import("./components/userInterface/resetPassword")
);
const ErrorBoundary = lazy(() =>
  import("./components/userInterface/errorBoundary")
);
import "./index.css";
import "./Styling/App.css";
const ProtectedRoute = lazy(() =>
  import("./components/userInterface/protectRoute")
);
// import { store } from "./components/store/store";
const routing = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Suspense fallback={<Fallback />}>
            <Header />
            <ErrorBoundary>
              <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/ProductList" component={ProductList} />
                <Route path="/Home" component={App} />
                <Route path="/MyAccount" component={MyAccount} />
                <Route path="/Cart" component={Cart} />
                <Route path="/Categories" component={Categories} />
                <Route path="/ProductList/:id" component={ProductDisplay} />
                <Route path="/Wishlist" component={Wishlist} />
                <ProtectedRoute path="/Admin" component={Admin} />
                <Route path="/Login" component={Login} />
                <ProtectedRoute path="/Checkout" component={Checkout} />
                <Route path="/Contact" component={Contact} />
                <Route path="/About" component={About} />
                <ProtectedRoute path="/OrderSummary" component={OrderSummary} />
                <ProtectedRoute path="/AdminProduct" component={AdminProduct} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                <ProtectedRoute
                  path="/UpdatePassword"
                  component={UpdatePassword}
                />
                <ProtectedRoute
                  path="/ResetPassword"
                  component={ResetPassword}
                />
                <ProtectedRoute
                  path="/AdminProductIndividual"
                  component={AdminProductIndividual}
                />
                <ProtectedRoute
                  path="/AdminProductEdit"
                  component={AdminProductEdit}
                />
                <ProtectedRoute path="/AdminUser" component={AdminUser} />
                <ProtectedRoute
                  path="/AdminUserIndividual"
                  component={AdminUserIndividual}
                />
                <ProtectedRoute path="/Profile" component={Profile} />
                <ProtectedRoute
                  path="/AdminProductAdd"
                  component={AdminProductAdd}
                />
              </Switch>
            </ErrorBoundary>
          </Suspense>
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

