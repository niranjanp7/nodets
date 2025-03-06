import { Model, Mongoose, Schema } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import { CLG_CODES } from '../utils/constants';

import { CustomerNamespace, InventoryNamespace } from '../interfaces';

import ProductSchema from './inventory/Product';
import UserSchema from './customer/User';

let Product: Model<InventoryNamespace.Product>;
let User: Model<CustomerNamespace.User>;

const syncTables = async (db: Mongoose): Promise<boolean> => {
    const AutoIncrement = AutoIncrementFactory(db.connection as any) as any;

    const sync = <T>(schema: Schema, inc_field: string = '_id', start_seq: number = 1): Model<T> => {
        const schemaName = schema.get('collection');

        console.log(`SYNC SCHEMA : ${CLG_CODES.GREEN}${schemaName}${CLG_CODES.RESET} STATUS : ${CLG_CODES.YELLOW}PENDING${CLG_CODES.RESET}`);

        if (!schemaName) {
            console.log(
                `${CLG_CODES.LINE_DEL}SYNC SCHEMA : ${CLG_CODES.GREEN}${schemaName}${CLG_CODES.RESET} STATUS : ${CLG_CODES.RED}FAIL   ${CLG_CODES.RESET}`
            );
            throw new Error('ERROR : Please specify collection name in schema.');
        }

        schema.plugin(AutoIncrement, { id: `${schemaName}_id`, inc_field, start_seq });
        const model = db.model<T>(schemaName, schema);
        model.syncIndexes();
        console.log(
            `${CLG_CODES.LINE_DEL}SYNC SCHEMA : ${CLG_CODES.GREEN}${schemaName}${CLG_CODES.RESET} STATUS : ${CLG_CODES.GREEN}SUCCESS${CLG_CODES.RESET}`
        );

        return model;
    };

    try {
        Product = sync<InventoryNamespace.Product>(ProductSchema);
        User = sync<CustomerNamespace.User>(UserSchema);
    } catch (error: any) {
        console.error(error.message);
        return false;
    }

    return true;
};

export { syncTables, Product, User };
