import { AuthorizedUser } from "./types";

declare global {
  namespace Express {
    interface Request {
      customerInfo?: AuthorizedUser;
      adminInfo?: AuthorizedUser;
    }
  }
}
