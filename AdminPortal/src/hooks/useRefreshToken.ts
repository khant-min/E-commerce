import axios from "axios";
import { useAuth } from "../context/DataProvider";

export default function useRefreshToken() {
  const { setAuth } = useAuth as any; // to repair exact type later

  const refresh = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/services/refresh",
      {
        withCredentials: true, // this sent backend with cookies
      }
    );

    setAuth((prev: any) => {
      console.log(prev);
      console.log(response);
      // return { ...prev , accessToken: response.data.accessToken};
    });
    return response.data.accessToken;
  };
  return refresh;
}
