import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';

const USERS = [
    {
        username: 'user1',
        password: 'admin@123',
        email: 'email@email.com'
    }
];

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.render('auth/login', { error: true, type: 'error-message', message: 'Insuffecient Details' });
        return;
    }

    const user = USERS.find((u) => u.username === username);

    if (!user || user.username != username || user.password != password) {
        res.render('auth/login', { error: true, type: 'error-message', message: 'Username & Passord does not match.' });
        return;
    }

    const token = sign(user, JWT_SECRET, { expiresIn: 60000 });

    res.render('auth/login', { error: false, message: token });
};

export const register = (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(401).json({ error: true, message: 'Insuffecient Details' });
        return;
    }

    const user = USERS.find((u) => u.username === username || username.email === email);

    if (user) {
        res.render('auth/register', { error: true, type: 'error', message: 'User already exist with same Username or Email' });
        return;
    }

    USERS.push({ username, password, email });

    res.render('auth/register', { error: false, type: 'success', message: 'Account created successfully. Please go to login page to proceed.' });
};

export const registerForm = (_: Request, res: Response) => {
    res.render('auth/register');
};

export const authWelcomeForm = (_: Request, res: Response) => {
    res.render('auth/welcome');
};

export const loginForm = (_: Request, res: Response) => {
    res.render('auth/login');
};
