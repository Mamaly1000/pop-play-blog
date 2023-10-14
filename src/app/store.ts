import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import AuthReducer from "./Auth/AuthReducer";
const combinedReducers = combineReducers({
  auth: AuthReducer,
});
const bindMiddleWares = (middleWares: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    return applyMiddleware(logger, ...middleWares);
  } else {
    return applyMiddleware(...middleWares);
  }
};
const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducers(state, action as any);
  }
};
const reduxStore = (context: Context) =>
  createStore(masterReducer, bindMiddleWares([thunk]));
const Wrapper = createWrapper(reduxStore);
export default Wrapper;
