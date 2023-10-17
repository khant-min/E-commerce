import axios from "axios";

class TokenService {
  private privateApi;

  constructor() {
    this.privateApi = axios.create({
      baseURL: "http://localhost:8080",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }

  public getPrivateApi() {
    return this.privateApi;
  }
}

export default new TokenService();
