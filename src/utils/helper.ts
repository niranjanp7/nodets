import { NextFunction, Request, Response } from 'express';

export const accessControlAllowOrigin = (_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}