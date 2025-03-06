import { Schema } from 'mongoose';

import { InventoryNamespace } from '../../interfaces';

const ProductSchema: Schema = new Schema(
    {
        _id: { type: Number, require: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: {
            type: String,
            enum: Object.values(InventoryNamespace.PRODUCT_CATEGORY),
            required: true
        },
        price: { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, min: 0, max: 5, default: 0 }
    },
    {
        timestamps: true,
        collection: 'product',
        toJSON: {
            transform: function (_, d) {
                d.id = d._id;
                delete d._id;
                delete d.__v;
            }
        },
        toObject: {
            transform: function (_, d) {
                d.id = d._id;
                delete d._id;
                delete d.__v;
            }
        }
    }
);

export default ProductSchema;
