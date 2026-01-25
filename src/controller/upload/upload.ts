import type { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
    if (!req.files) {
        res.status(400).send('No file uploaded.');
        return;
    }

    res.status(200).json({
        message: 'File uploaded successfully!',
        file: req.file
    });
};
