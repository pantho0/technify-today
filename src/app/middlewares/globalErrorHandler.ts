/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  let statusCode = 500;
  let message = err.message || "Internal Server Error";
  let errorSources: TErrorSources = [
    {
      path: "",
      messsage: "Internal Server Error",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    // err,
    errorSources,
    // stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
