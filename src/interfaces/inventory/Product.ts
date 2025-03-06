export enum PRODUCT_CATEGORY {
    ELECTRONICS = 'ELECTRONICS',
    HOUSEHOLD = 'HOUSEHOLD',
    LIFE_STYLE = 'LIFE_STYLE'
};

export namespace ProductNamespace {
    export interface Product {
        _id?: number;
        name: string;
        description: string;
        category: PRODUCT_CATEGORY;
        price: number;
        stock: number;
        rating: number;
        createdAt?: Date;
        updatedAt?: Date;
    }
}
