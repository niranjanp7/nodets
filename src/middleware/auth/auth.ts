import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';

export const authRequest = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (authorization && authorization === 'Bearer mytoken') {
        next();
    } else {
        res.status(403).json({ error: true, message: 'Forbidden: Invalid token' });
    }
};

export const jwtAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: true, message: 'Invalid Token' });
        return;
    }

    const isTokenValid = verify(authorization, JWT_SECRET);

    if (isTokenValid) {
        next();
        return;
    }

    res.status(401).json({ error: true, message: 'Invalid Token' });
};
