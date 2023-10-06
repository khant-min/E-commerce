import { clearAccessToken, setAccessToken } from "../redux/auth/actions";
import { store } from "../redux/store/store";
import ApiService from "./ApiService";

export interface Response {
  accessToken: string | null;
}

class AuthService {
  private store = store;
  public async login(payload: {
    email: string;
    password: string;
    role: string;
  }): Promise<void> {
    try {
      const response = await ApiService.call<Response>(
        "POST",
        "/auth/admin/login",
        payload
      );

      const accessToken = response.accessToken;
      this.store.dispatch(setAccessToken(accessToken));
      localStorage.setItem("firstLogin", "Y");
    } catch (error) {
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await ApiService.call<Response>("POST", "/auth/admin/logout");

      this.store.dispatch(clearAccessToken());
    } catch (error) {
      throw error;
    }
  }

  public async refresh(): Promise<void> {
    try {
      const response = await ApiService.call<Response>(
        "GET",
        "/services/refresh"
      );

      const accessToken = response.accessToken;
      if (accessToken) {
        this.store.dispatch(setAccessToken(accessToken));
      } else {
        await this.logout();
      }
    } catch (error) {
      await this.logout();
      throw error;
    }
  }
}

export default new AuthService();
