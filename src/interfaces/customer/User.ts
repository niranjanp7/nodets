export namespace UserNamespace {
    export interface User {
        _id?: number;
        username: string;
        email: string;
        password: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
}