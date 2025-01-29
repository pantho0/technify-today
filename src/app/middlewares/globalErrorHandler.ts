/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  const statusCode = 500;
  const message = err.message || "Internal Server Error";
  const errorSources: TErrorSources = [
    {
      path: "",
      messsage: "Internal Server Error",
    },
  ];

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
