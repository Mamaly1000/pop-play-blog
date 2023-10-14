import { Iuser } from "src/context/AuthContext";
import { authTypes } from "./AuthReducer";
import http from "@/services/httpService";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import Router from "next/router";
import { AxiosError, AxiosResponse } from "axios";

export type userAuthenticationFormType = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicURL: string;
  biography: string;
  expertise: string;
};

const AuthActionCreactor = (type: authTypes, payload: Iuser) => {
  return {
    type,
    payload,
  };
};
export const FetchUserAuthentication = (
  type: "login" | "signUp" | "logout" | "load",
  method: "GET" | "POST",
  route: "/user/signin" | "/user/signup" | "/user/logout" | "/user/load",
  data?: Partial<userAuthenticationFormType>
) => {
  return (dispatch: any) => {
    dispatch(
      AuthActionCreactor("Auth_PENDING", {
        error: "",
        istrusted: false,
        loading: true,
        user: null,
      })
    );
    if (method === "POST" && data) {
      const postData: Partial<typeof data> =
        type === "login"
          ? { email: data.email, password: data.password }
          : {
              biography: data.biography,
              email: data.email,
              expertise: data.expertise,
              name: data.name,
              password: data.password,
              phoneNumber: data.phoneNumber,
              profilePicURL: data.profilePicURL,
            };
      http
        .post(route, postData, {
          withCredentials: true,
        })
        .then(({ data }) => {
          toast.success(
            type === "login" ? data.message : "you signed up successfuly !"
          );
          dispatch(
            AuthActionCreactor("Auth_SUCCESS", {
              error: "",
              istrusted: true,
              loading: false,
              user: data,
            })
          );
          Router.push("/profile");
        })
        .catch((err) => {
          dispatch(
            AuthActionCreactor("Auth_REJECT", {
              error: err.response?.data.message,
              istrusted: false,
              loading: false,
              user: null,
            })
          );
          toast.error(err.response?.data.message as string);
        });
    }
    if (method === "GET") {
      if (type === "logout") {
        http
          .get(route)
          .then((res: AxiosResponse<{ message: string }>) => {
            toast.warn(res?.data.message);
            dispatch(
              AuthActionCreactor("AUTH_LOGOUT", {
                error: "",
                istrusted: false,
                loading: false,
                user: null,
              })
            );
            Router.push("/login");
          })
          .catch((err) => {
            dispatch(
              AuthActionCreactor("Auth_REJECT", {
                error: err.response.data.message,
                istrusted: false,
                loading: false,
                user: null,
              })
            );
            toast.error("failed to logout");
          });
      }
      if (type === "load") {
        http
          .get(route)
          .then((res: AxiosResponse) => {
            dispatch(
              AuthActionCreactor("Auth_SUCCESS", {
                error: "",
                istrusted: true,
                loading: false,
                user: res.data,
              })
            );
            toast.success(`wellcome to your account ${res.data.name}`);
          })
          .catch((err: AxiosError<{ message: string }>) => {
            toast.error(err.response?.data.message);
            dispatch(
              AuthActionCreactor("Auth_REJECT", {
                error: err.response?.data.message || "falied to load data!",
                istrusted: false,
                loading: false,
                user: null,
              })
            );
          });
      }
    }
  };
};
