import { Request, Response } from 'express';
import fs, { readFileSync } from 'fs';
import { join } from 'path';
import { Emitter } from '../../events/product';
import { EVENTS } from '../../utils/constants';

const FILE_PATH = join(__dirname, './productdb.json');
const BACKUP_FILE_PATH = join(__dirname, './backup-productdb.json');

interface Product {
    id: number;
    name: string;
    description: string;
}

const readProductFile = (): Product[] => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data) as Product[];
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

const writeProductFile = (data: Product[]) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
        console.log('File successfully updated.');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
};

const backupProductFile = () => {
    const products = readProductFile();
    fs.writeFileSync(BACKUP_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
};

export const readProductSync = (_: Request, res: Response) => {
    Emitter.emit(EVENTS.READ_PRODUCTS);

    const products = readFileSync(FILE_PATH, 'utf-8');

    if (products) {
        try {
            const data = JSON.parse(products) as Product[];
            res.status(200).json({ error: false, data });
        } catch (error: any) {
            res.status(500).json({ error: true, message: error.message });
            console.error('ERROR: ', error);
        }
    } else {
        res.status(500).json({ error: true, message: 'Unable to read file' });
    }
};

export const readProductAsync = (_: Request, res: Response) => {
    fs.readFile(FILE_PATH, 'utf-8', (error, data) => {
        if (error) {
            res.status(500).json({ error: true, message: error.message });
            console.error('ERROR: ', error);
        } else {
            const products = JSON.parse(data) as Product[];
            res.status(200).json({ error: false, data: products });
        }
    });
};

export const readProductBackupSync = (_: Request, res: Response) => {
    try {
        const data = fs.readFileSync(BACKUP_FILE_PATH, { encoding: 'utf-8', flag: 'r' });
        const products = JSON.parse(data) as Product[];
        res.status(200).json({ error: false, data: products });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
        console.error('ERROR: ', error);
    }
};

export const addProduct = (req: Request, res: Response) => {
    const product = req.body;

    const products = readProductFile();

    const id = products.length + 1;

    products.push({ id, ...product });

    writeProductFile(products);

    res.status(200).json({ error: false, message: 'Product has been added to db successfully.', id });

    backupProductFile();
};

export const updateProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, description } = req.body as { name: string | undefined; description: string | undefined };

    const products = readProductFile();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
        const product = products[productIndex];

        if (name) {
            product.name = name;
        }

        if (description) {
            product.description = description;
        }

        products[productIndex] = product;

        writeProductFile(products);

        res.status(200).json({ error: false, message: 'Product updated successfully.' });

        backupProductFile();
    } else {
        res.status(400).json({ error: true, message: 'Invalid product ID' });
    }
};

const deleteProduct = (id: number) => {
    let products = readProductFile();
    const initialLength = products.length;
    products = products.filter((product) => product.id !== id);

    if (products.length < initialLength) {
        writeProductFile(products);
        console.log(`Product with ID ${id} deleted.`);
    } else {
        console.log(`Product with ID ${id} not found.`);
    }
};
