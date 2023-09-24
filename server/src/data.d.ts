import { AuthorizedUser } from "./types";

declare global {
  namespace Express {
    interface Request {
      userInfo?: AuthorizedUser;
    }
  }
}
