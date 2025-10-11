// src/middlewares/error.middleware.ts
import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
}
