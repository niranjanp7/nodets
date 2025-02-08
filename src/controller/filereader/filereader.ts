import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const FILE_NAME = path.join(__dirname, 'customer.txt');
const BACKUP_FILE_NAME = path.join(__dirname, 'customer_backup.txt');

export const readCustomerFile = (): string => {
    const data = fs.readFileSync(FILE_NAME, { encoding: 'utf-8' });

    return data;
};

export const writeToFile = (content?: string): string => {
    let data = `\nNew Entry ${new Date().toISOString()}`;

    if (content) {
        data = content;
    }

    fs.writeFileSync(FILE_NAME, data, { flag: 'a' });
    return readCustomerFile();
};

export const backupFile = (): string => {
    const data = readCustomerFile();
    fs.writeFileSync(BACKUP_FILE_NAME, data, { flag: 'a' });
    return 'File Backup Successful';
};

export const deleteFile = () => {
    fs.unlinkSync(BACKUP_FILE_NAME);
    return 'File Delete Successful';
};
