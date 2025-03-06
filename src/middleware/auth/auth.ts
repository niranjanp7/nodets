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

export const authProductHome = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.['access_token'];
    let isTokenValid = false;

    const publicRoutes = ['/', '/login', '/register'];

    if (token) {
        try {
            verify(token, JWT_SECRET);
            isTokenValid = true;
        } catch (error) {
            isTokenValid = false;
        }
    }
    const isPublicRoute = publicRoutes.includes(req.path);

    if ((!token && isPublicRoute) || (isTokenValid && !isPublicRoute)) {
        return next();
    }

    if (!token || !isTokenValid) {
        return res.redirect(publicRoutes[0]);
    }

    if (isTokenValid && isPublicRoute) {
        return res.redirect('/home');
    }
};
