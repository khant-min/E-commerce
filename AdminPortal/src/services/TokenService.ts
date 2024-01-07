import axios from "axios";

// class TokenService {
//   private privateApi;

//   constructor() {
//     this.privateApi = axios.create({
//       baseURL: "http://localhost:8080",
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//   }
// }

// export default new TokenService();

const TokenService = axios.create({
  baseURL: "http://localhost8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default TokenService;
