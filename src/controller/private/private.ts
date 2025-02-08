import { Request, Response } from 'express';

export const privateData = (_: Request, res: Response) => {
    res.status(200).json({error: false, message: 'You are accessing private data'});
}