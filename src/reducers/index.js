import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import billsReducer from "./bills.reducer";
import historyReducer from "./historyBills.reducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  bills: billsReducer,
  history: historyReducer,
});
