import { Request, Response } from 'express';
import { Product } from '../../models';
import { InventoryNamespace } from '../../interfaces';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json({error: false, data: products});
    } catch (error: any) {
        res.status(500).json({ error: true, type: 'CRUD/READ', message: error.message });
        console.error('ERROR : Reading Products : Error:', error.message);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (product) {
            res.status(200).json({error: false, data: product});
        } else {
            throw new Error(`No product fount with ID: ${id}`);
        }
    } catch (error: any) {
        res.status(500).json({ error: true, type: 'CRUD/READ', message: error.message });
        console.error('ERROR : Reading Product by ID : Error:', error.message);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body as InventoryNamespace.Product);
        await product.save();
        res.status(200).json({error: false, data: product});
    } catch (error: any) {
        res.status(500).json({ error: true, type: 'CRUD/WRITE', message: error.message });
        console.error('ERROR : Creating Product : Error:', error.message);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body as InventoryNamespace.Product);

        if (product) {
            res.status(200).json({error: false, data: product});
        } else {
            throw new Error(`No product fount with ID: ${id}`);
        }
    } catch (error: any) {
        res.status(500).json({ error: true, type: 'CRUD/UPDATE', message: error.message });
        console.error('ERROR : Updating Product by ID : Error:', error.message);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (product) {
            res.status(200).json({error: false, data: product});
        } else {
            throw new Error(`No product fount with ID: ${id}`);
        }
    } catch (error: any) {
        res.status(500).json({ error: true, type: 'CRUD/DELETE', message: error.message });
        console.error('ERROR : Delete Product by ID : Error:', error.message);
    }
}