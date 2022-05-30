const initial = {
  cart: [],
  cartAmount: 0,
  cartItems: 0,
  individualProductObject: {},
  user: "SignIn",
  email: "",
  isLoggedIn: false,
  allUsers: [],
  individualUserObject: {},
  requestedProducts: [],
  wishlist: [],
  userVerified: true,
  userValidationMessage: "",
  paymentSession: "",
  jwt: "",
  loading: false,
};
export const Reducer = function (state = initial, action) {
  switch (action.type) {
    case "SHOW_LOADING": {
      return { ...state, loading: action.payload };
    }
    case "HIDE_LOADING": {
      return { ...state, loading: action.payload };
    }
    case "JWT": {
      return { ...state, jwt: action.payload };
    }
    case "CHECKOUT": {
      return { ...state, paymentSession: action.payload };
    }
    case "GET_TOTAL_CART": {
      return { ...state, cart: action.payload };
    }
    case "GET_INDIVIDUAL_CART": {
      return { ...state, cart: action.payload };
    }
    case "GET_CART_AMOUNT": {
      return {
        ...state,
        cartAmount: action.payload.total,
        cartItems: action.payload.items,
      };
    }

    case "DELETE_TOTAL_CART": {
      return { ...state };
    }
    case "UPDATE_CART": {
      return { ...state };
    }
    case "ADD_TO_CART": {
      return { ...state };
    }
    case "DELETE_INDIVIDUAL_CART": {
      return { ...state };
    }

    case "GET_REQUESTED_PRODUCTS": {
      return { ...state, requestedProducts: action.payload };
    }

    case "GET_INDIVIDUAL_PRODUCT": {
      return {
        ...state,
        individualProductObject: action.payload,
      };
    }
    case "DELETE_INDIVIDUAL_PRODUCT": {
      return { ...state };
    }
    case "ADD_INDIVIDUAL_PRODUCT": {
      return { ...state };
    }
    case "EDIT_INDIVIDUAL_PRODUCT": {
      return { ...state };
    }
    case "CHANGE_USER": {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    }
    case "VERIFY_USER": {
      return {
        ...state,
        userVerified: action.payload.success,
        userValidationMessage: action.payload.message,
      };
    }
    case "RESET_USER": {
      return {
        ...state,
        cart: [],
        cartAmount: 0,
        cartItems: 0,
        individualProductObject: {},
        user: "SignIn",
        email: "",
        isLoggedIn: false,
        allUsers: [],
        individualUserObject: {},
        requestedProducts: [],
        wishlist: [],
        userVerified: true,
        userValidationMessage: "",
        paymentSession: "",
        jwt: "",
        loading: false,
      };
    }

    case "ADD_USER": {
      return {
        ...state,
        
      };
    }

    case "UPDATE_USER": {
      return { ...state };
    }

    case "GET_ALL_USERS": {
      return { ...state, allUsers: action.payload };
    }

    case "GET_INDIVIDUAL_USER": {
      return {
        ...state,
        individualUserObject: action.payload,
        email: action.payload.userid,
      };
    }

    case "DELETE_INDIVIDUAL_USER": {
      return { ...state };
    }
    case "GET_TOTAL_WISHLIST": {
      return { ...state, wishlist: action.payload };
    }

    case "DELETE_TOTAL_WISHLIST": {
      return { ...state };
    }
    case "ADD_TO_WISHLIST": {
      return { ...state };
    }

    case "DELETE_INDIVIDUAL_WISHLIST": {
      return { ...state };
    }
    default:
      return state;
  }
};
