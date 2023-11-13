import { useAuth } from "../context/AuthProvider";
import { AuthContextProps } from "../types";
import ApiService from "../services/ApiService";

export default function useRefreshToken() {
  const { setAuth } = useAuth() as AuthContextProps;

  const refresh = async () => {
    const response = await ApiService.call(
      "http://localhost:8080/api/services/refresh",
      "GET",
      {},
      {
        withCredentials: true, // this sent backend with cookies
      }
    );

    setAuth((prev: any) => {
      console.log("prev token: ", prev);
      console.log("response token: ", response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
}
