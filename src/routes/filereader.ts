import { Request, Response, Router } from 'express';

import { AuthMiddleware } from '../middleware';
import { FileReaderController } from '../controller';

const router = Router();

const handleController = (controller: (params?: string) => string) => {
    return (req: Request, res: Response) => {
        try {
            if (controller) {
                let data;
                switch (req.method) {
                    case 'POST':
                        data = controller(String(req.body?.data));
                        break;
                    default:
                        data = controller();
                }
                res.status(200).send(data);
            }
        } catch (error) {
            res.status(500).send(String(error));
        }
    };
};

// GET REQUESTS
router.get('/', AuthMiddleware.authRequest, handleController(FileReaderController.readCustomerFile));
router.get('/wf', handleController(FileReaderController.writeToFile));
router.get('/bf', handleController(FileReaderController.backupFile));
router.get('/df', handleController(FileReaderController.deleteFile));

// POST REQUESTS
router.post('/wf', handleController(FileReaderController.writeToFile));

export default router;
