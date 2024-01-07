import { useEffect } from "react";
import TokenService from "../services/TokenService";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthProvider";
import { AuthContextProps } from "../types";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth() as AuthContextProps;

  useEffect(() => {
    const requestIntercept = TokenService.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      err => Promise.reject(err)
    );

    const responseIntercept = TokenService.interceptors.response.use(
      response => response,
      async err => {
        console.log("err: ", err);
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return TokenService(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      TokenService.interceptors.request.eject(requestIntercept);
      TokenService.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return TokenService;
};

export default useAxiosPrivate;
