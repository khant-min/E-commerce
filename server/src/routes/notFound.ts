import { Router, Request, Response } from "express";
const router = Router();

export default router.get("/", (req: Request, res: Response) => {
  res.status(404).send("404 | Not Found");
});
