import { UserCredentials } from "../types";
import ApiService from "./ApiService";

class UserService {
  async login(req: UserCredentials) {
    try {
      const response = await ApiService.call("/auth/admin/login", "POST", req, {
        withCredentials: true,
      });
      console.log("response in user service: ", response);
      return { data: response, success: true, message: "Login successful" };
    } catch (err) {
      console.log("err in user service: ", err);
      return {
        success: false,
        message: err,
      };
    }
  }

  async logout() {
    try {
      const response = await ApiService.call("/auth/admin/logout", "POST");
      console.log(response);
      return { data: response, success: true, message: "Logout successful" };
    } catch (_) {
      return {
        success: false,
        message: "Logout failed",
      };
    }
  }
}

export default new UserService();
