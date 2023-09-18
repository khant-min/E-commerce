import { ErrorRequestHandler } from "express";

interface ErrorType {
  message: string;
  status: number;
}

const errorHandler: ErrorRequestHandler = (err: ErrorType, req, res, next) => {
  res.status(err.status).send(err.message);
};

export default errorHandler;
