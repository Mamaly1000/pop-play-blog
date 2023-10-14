import { Iuser } from "src/context/AuthContext";
import { userType } from "../../types/user-type";

export type authTypes =
  | "Auth_PENDING"
  | "Auth_SUCCESS"
  | "Auth_REJECT"
  | "SIGNUP_SUCCESS"
  | "AUTH_LOGOUT";

const initailAuthState: Iuser = {
  error: "",
  istrusted: false,
  loading: false,
  user: null,
};
const AuthReducer = (
  state = initailAuthState,
  action: {
    type: authTypes;
    payload: Iuser;
  }
): Iuser => {
  switch (action.type) {
    case "Auth_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "Auth_SUCCESS":
      return {
        error: action.payload.error,
        istrusted: action.payload.istrusted,
        loading: action.payload.loading,
        user: action.payload.user,
      };
    case "SIGNUP_SUCCESS":
      return {
        error: action.payload.error,
        istrusted: action.payload.istrusted,
        loading: action.payload.loading,
        user: action.payload.user,
      };
    case "Auth_REJECT":
      return {
        error: action.payload.error,
        istrusted: action.payload.istrusted,
        loading: action.payload.loading,
        user: action.payload.user,
      };
    case "AUTH_LOGOUT":
      return {
        error: action.payload.error,
        istrusted: action.payload.istrusted,
        loading: action.payload.loading,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
export default AuthReducer;
export const selectAuth = (state: any) => {
  return state.auth as Iuser;
};
