import { combineReducers, createStore } from "redux";
// import axiosMiddleware from "redux-axios-middleware";
// import axios from "axios";
import userinfoReducer from "./ducks/userinfo";

const reducer = combineReducers({
  userinfo: userinfoReducer,
});

const store = createStore(reducer);

export default store;
