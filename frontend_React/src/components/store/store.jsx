import { applyMiddleware, compose } from "redux";
// import { createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { Reducer } from "../reducers/allInOneReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);
// const enhancer = [
//   applyMiddleware(thunk),
// ];

// const store = createStore(persistedReducer, compose(...enhancer));
const store = configureStore({ reducer: Reducer, middleware:[thunk], });

const persistor = persistStore(store);

export { store };
export { persistor };
