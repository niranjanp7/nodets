import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET, PRODUCTION } from '../../config/config';
import { User } from '../../models';
import { hashPassword, matchPassword } from '../../utils/bcrypt';

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

// authentication using mongodb

export const register2 = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(401).json({ error: true, message: 'Insuffecient Details' });
        return;
    }

    try {
        const user = new User({ username, email, password: await hashPassword(password) });
        await user.save();
        res.render('auth/login', { error: false, type: 'success', message: 'Account created successfully. Please enter your credentials to login.' });
    } catch (error: any) {
        res.render('auth/register', { error: true, type: 'error', message: error.message });
        console.error(`ERROR : Register User : Error: ${error.message}`);
    }
};

export const login2 = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.render('auth/login', { error: true, type: 'error-message', message: 'Insuffecient Details' });
        return;
    }

    try {
        const user = await User.findOne({ username });

        if (user) {
            if (await matchPassword(password, user.password)) {
                const payload = {
                    username: user.username,
                    email: user.email
                };
                const token = sign(payload, JWT_SECRET, { expiresIn: 60000 });
                res.cookie('access_token', token, {
                    httpOnly: true,
                    secure: PRODUCTION,
                    maxAge: 60000,
                    sameSite: 'strict'
                });
                res.render('auth/login', { error: false, message: token });
            } else {
                throw new Error('Username & Passord does not match.');
            }
        } else {
            throw new Error('No user found with specified Username');
        }
    } catch (error: any) {
        res.render('auth/login', { error: true, type: 'error-message', message: error.message });
        console.error(`ERROR : Login : Error: ${error.message}`);
    }
};
