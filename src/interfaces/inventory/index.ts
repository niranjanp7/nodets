import { ProductNamespace, PRODUCT_CATEGORY as PRODUCT_CATEGORY_ENUM } from './Product';

export namespace InventoryNamespace {
    export import Product = ProductNamespace.Product;
    export import PRODUCT_CATEGORY = PRODUCT_CATEGORY_ENUM;
};