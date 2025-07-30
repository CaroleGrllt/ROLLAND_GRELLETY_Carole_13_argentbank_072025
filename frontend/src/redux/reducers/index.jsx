import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import loginReducer from "./login.reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

export default rootReducer;