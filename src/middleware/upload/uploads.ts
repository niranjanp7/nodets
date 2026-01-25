import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (_, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });
