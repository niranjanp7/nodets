import { NextFunction, Request, Response } from "express";

export const logRequestInfo = (req: Request, _: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} URL: ${req.url} ${JSON.stringify(req.body)}`);
    next();
}