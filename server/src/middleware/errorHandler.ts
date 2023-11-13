import { ErrorRequestHandler } from "express";
import { logEvents } from "./logHandler";

interface ErrorType {
  message: string;
  status: number;
  name?: string;
}

const errorHandler: ErrorRequestHandler = (err: ErrorType, req, res, next) => {
  console.log("err: ", err);
  logEvents(`${err.name ?? "Error name"}: ${err.message}`, "errLog.txt");
  res.status(err.status ? err.status : 400).send(err.message);
};

export default errorHandler;
