import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { store } from "../redux/store/store";

class ApiService {
  private axiosInstance: AxiosInstance;
  private store = store;
  constructor() {
    this.axiosInstance = axios.create({
      // baseURL: import.meta.env.API_URL,
      baseURL: "http://localhost:8080",
    });
  }

  private createAuthHeaders(): { Authorization: string } {
    const accessToken = this.store.getState().auth.accessToken;
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  private async makeRequest<T>(
    method: AxiosRequestConfig["method"],
    url: string,
    data?: any
  ): Promise<T> {
    const headers = this.createAuthHeaders();
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request({
        method,
        url,
        headers,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async call<T>(
    method: AxiosRequestConfig["method"],
    url: string,
    data?: any
  ): Promise<T> {
    return this.makeRequest<T>(method, url, data);
  }
}

export default new ApiService();
