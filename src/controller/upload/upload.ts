import { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
    }

    res.status(200).json({
        message: 'File uploaded successfully!',
        file: req.file
    });
};
