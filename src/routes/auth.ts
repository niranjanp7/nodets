import { Router } from 'express';

import { AuthMiddleware } from '../middleware';
import { AuthController, PrivateController } from '../controller';

const router = Router();

// GET REQUESTS
router.get('/', AuthController.authWelcomeForm),
router.get('/login', AuthController.loginForm),
router.get('/register', AuthController.registerForm);
router.get('/private', AuthMiddleware.jwtAuthToken, PrivateController.privateData);

// POST REQUESTS
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;
