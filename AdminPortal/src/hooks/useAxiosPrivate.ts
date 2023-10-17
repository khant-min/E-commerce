import { useEffect } from "react";
import TokenService from "../services/TokenService";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthProvider";
import { AuthContextProps } from "../types";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth() as AuthContextProps;
  const privateApi = TokenService.getPrivateApi();

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      err => Promise.reject(err)
    );

    const responseIntercept = privateApi.interceptors.response.use(
      response => response,
      async err => {
        console.log("err: ", err);
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateApi(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
      privateApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return privateApi;
};

export default useAxiosPrivate;
