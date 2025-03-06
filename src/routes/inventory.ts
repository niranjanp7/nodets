import { Router } from 'express';
import { InventroyController } from '../controller';

const router = Router();

// GET REQUESTS
router.get('/list', InventroyController.getAllProducts);
router.get('/:id', InventroyController.getProductById);

// POST REQUESTS
router.post('/createProduct', InventroyController.createProduct);

// PUT REQUESTS

// PATCH REQUESTS
router.patch('/updateProduct/:id', InventroyController.updateProduct);

// DELETE REQUESTS
router.delete('/deleteProduct/:id', InventroyController.deleteProduct);

export default router;
