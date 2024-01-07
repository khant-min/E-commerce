import { ErrorRequestHandler } from "express";

interface ErrorType {
  message: string;
  status: number;
}

const errorHandler: ErrorRequestHandler = (err: ErrorType, req, res, next) => {
  console.log("err: ", err);

  res.status(err.status ? err.status : 400).send(err.message);
};

export default errorHandler;
