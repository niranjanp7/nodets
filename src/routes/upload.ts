import { Router } from "express";

import { UploadMiddleware } from "../middleware";
import { UploadController } from "../controller";

const router = Router();

router.post('/', UploadMiddleware.upload.single('file'), UploadController.uploadFile);

export default router;