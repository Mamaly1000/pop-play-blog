import { postType } from "@/types/Post-type";
import { AxiosError, AxiosResponse } from "axios";
import React, {
  Dispatch,
  createContext,
  useContext,
  useLayoutEffect,
} from "react";
import { toast } from "react-toastify";
import { useReducerAsync } from "use-reducer-async";
import Router from "next/router";
import http from "@/services/httpService";
export interface Iuser {
  user: {
    name: string;
    profilePicURL: string;
    email: string;
    phoneNumber: string;
    password: string;
    isAdmin: boolean;
    biography: string;
    bookmarkedPosts: postType[];
    likedPosts: postType[];
    expertise: string;
  } | null;
  loading: boolean;
  istrusted: boolean;
  error: string;
}
interface actionType {
  type:
    | "LOGIN_PENDING"
    | "LOGIN_SUCCESS"
    | "LOGIN_REJECT"
    | "SIGNUP_PENDING"
    | "SIGNUP_SUCCESS"
    | "SIGNUP_REJECT"
    | "LOGOUT_SUCCESS";
  payload?: unknown;
}
interface asyncActionType {
  type: "LOGIN" | "SIGN_UP" | "LOG_OUT" | "USER_LOAD";
  payload?: unknown;
}
interface AuthContextType {
  user: Iuser;
}
type AuthContextDispatcherType = {
  dispatchUser: React.Dispatch<
    | asyncActionType
    | {
        type: string;
      }
  >;
};

const AuthContext = createContext<AuthContextType | null>(null);
const AuthContextDispatcher = createContext<AuthContextDispatcherType | null>(
  null
);

const initialUserState: Iuser = {
  user: null,
  error: "",
  istrusted: false,
  loading: false,
};

const reducer = (
  state: Iuser = initialUserState,
  action: actionType
): Iuser => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload as typeof state.user,
        loading: false,
        istrusted: true,
      };
    case "LOGIN_REJECT":
      return {
        ...state,
        error: action.payload as string,
        loading: false,
        istrusted: false,
      };
    case "LOGOUT_SUCCESS":
      return {
        user: null,
        error: "",
        istrusted: false,
        loading: false,
      };
    default:
      return state;
  }
};

const asyncReducer: any = {
  LOGIN:
    ({
      dispatch,
    }: {
      dispatch: Dispatch<actionType | { type: any }>;
    }): ((action: actionType) => void) =>
    (action): void => {
      dispatch({ type: "LOGIN_PENDING" });
      http
        .post("/user/signin", action.payload, {
          withCredentials: true,
        })
        .then(({ data }: { data: Iuser & { message: string } }) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
          toast.success(data.message + "sasdd");
          Router.push("/profile");
        })
        .catch(
          (
            err: AxiosError<{
              message: string;
            }>
          ) => {
            toast.error(err.response?.data.message as string);
            dispatch({
              type: "LOGIN_REJECT",
              payload: err.response?.data.message,
            });
          }
        );
    },
  SIGN_UP:
    ({
      dispatch,
    }: {
      dispatch: Dispatch<actionType>;
    }): ((action: actionType) => void) =>
    (action: actionType) => {
      dispatch({ type: "LOGIN_PENDING" });
      http
        .post("/user/signup", action.payload)
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          toast.success("you signed up successfuly !");
          Router.push("/profile");
        })
        .catch((err: AxiosError<{ message: string }>) => {
          toast.error(err.response?.data?.message);
          dispatch({ type: "LOGIN_REJECT" });
        });
    },
  LOG_OUT:
    ({ dispatch }: { dispatch: Dispatch<actionType | { type: string }> }) =>
    (_action: actionType) => {
      dispatch({ type: "LOGIN_PENDING" });
      http
        .get("/user/logout", { withCredentials: true })
        .then((res: AxiosResponse<{ message: string }>) => {
          toast.warn(res?.data.message);
          dispatch({ type: "LOGOUT_SUCCESS" });
          Router.push("/login");
        })
        .catch(() => toast.error("failed to logout"));
    },
  USER_LOAD:
    ({
      dispatch,
    }: {
      dispatch: Dispatch<actionType | { type: any }>;
    }): ((action: actionType) => void) =>
    (): void => {
      dispatch({ type: "LOGIN_PENDING" });

      http
        .get("/user/load", { withCredentials: true })
        .then((res: AxiosResponse) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          toast.success(`wellcome to your account ${res.data.name}`);
        })
        .catch((err: AxiosError<{ message: string }>) => {
          toast.error(err.response?.data.message);
        });
    },
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatchUser] = useReducerAsync(
    reducer,
    initialUserState,
    asyncReducer
  );
  useLayoutEffect(() => {
    dispatchUser({
      type: "USER_LOAD",
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>
      <AuthContextDispatcher.Provider value={{ dispatchUser }}>
        {children}
      </AuthContextDispatcher.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
const useAuth = () => useContext(AuthContext);
const useAuthActions = () => useContext(AuthContextDispatcher);
export { useAuth, useAuthActions };
