import path from 'path';
import fs from 'fs';
import multer from 'multer';

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });
