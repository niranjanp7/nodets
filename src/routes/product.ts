import { Router } from 'express';
import { ProductController } from '../controller';

const router = Router();

// GET REQUESTS
router.get('/', ProductController.readProductSync);
router.get('/backup', ProductController.readProductBackupSync);

// POST REQUESTS
router.post('/', ProductController.addProduct);

// PUT REQUESTS
router.put('/:id', ProductController.updateProduct);

export default router;
