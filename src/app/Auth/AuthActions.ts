import { Iuser } from "src/context/AuthContext";
import { authTypes } from "./AuthReducer";
import http from "@/services/httpService";

const AuthActionCreactor = (type: authTypes, payload: Iuser) => {
  return {
    type,
    payload,
  };
};
export const FetchUserAuthentication = (
  type: "login" | "signUp",
  method: "GET" | "POST",
  route: "/user/signin" | "/user/signup",
  data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    profilePic: string;
    biography: string;
    expertise: string;
  }
) => {
  return (dispatch: any) => {
    const postData: Partial<typeof data> =
      type === "login"
        ? { email: data.email, password: data.password }
        : {
            biography: data.biography,
            email: data.email,
            expertise: data.expertise,
            name: data.name,
            password: data.password,
            phone: data.phone,
            profilePic: data.profilePic,
          };
    dispatch(
      AuthActionCreactor("Auth_PENDING", {
        error: "",
        istrusted: false,
        loading: true,
        user: null,
      })
    );
    if (method === "POST") {
      http
        .post(route, postData, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(
            AuthActionCreactor("Auth_SUCCESS", {
              error: "",
              istrusted: true,
              loading: false,
              user: res.data,
            })
          );
        })
        .catch((err) =>
          dispatch(
            AuthActionCreactor("Auth_REJECT", {
              error: err.response.data.message,
              istrusted: false,
              loading: false,
              user: null,
            })
          )
        );
    }
    if (method === "GET") {
      http
        .get(route)
        .then((res) => {})
        .catch((err) => {});
    }
  };
};
