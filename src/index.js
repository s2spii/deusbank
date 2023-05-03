import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { getUsers } from "./actions/user.action";
import { getBills } from "./actions/bills.action";
import { getHistoryBills } from "./actions/historyBills.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getUsers());
store.dispatch(getBills());
store.dispatch(getHistoryBills());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
