import ApiService from "./ApiService";

class UserService {
  async register(payload = {}) {
    try {
      const res = await ApiService.call("/auth/register", "POST", payload);

      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  async login(payload = {}) {
    try {
      const res = await ApiService.call("/auth/login", "POST", payload);

      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  async logout(payload = {}) {
    try {
      const res = await ApiService.call("/auth/logout", "POST", payload);

      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }
}

export default new UserService();
