import axios, { AxiosRequestConfig } from "axios";

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080",
    });
  }

  getCredentials() {}

  async call(
    end_point: string,
    method: string,
    payload: unknown = "<BLANK>",
    config: AxiosRequestConfig = {}
  ) {
    try {
      let response;
      switch (method) {
        case "GET":
          response = await this.api.get(end_point, config);
          break;
        case "POST":
          response = await this.api.post(end_point, payload, config);
          break;
        case "UPDATE":
          response = await this.api.put(end_point, payload, config);
          break;
        case "DELETE":
          response = await this.api.delete(end_point);
          break;
        default:
          console.log("Invalid call");
          break;
      }
      return Promise.resolve(response!.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new ApiService();
