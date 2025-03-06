import { Router } from 'express';

import { AuthMiddleware } from '../middleware';
import { AuthController, PrivateController } from '../controller';

const router = Router();

// GET REQUESTS
router.get('/', AuthMiddleware.authProductHome, AuthController.authWelcomeForm),
router.get('/login', AuthMiddleware.authProductHome, AuthController.loginForm),
router.get('/register', AuthMiddleware.authProductHome, AuthController.registerForm);
router.get('/private', AuthMiddleware.jwtAuthToken, PrivateController.privateData);

// POST REQUESTS
router.post('/login', AuthController.login2);
router.post('/register', AuthController.register2);

export default router;
