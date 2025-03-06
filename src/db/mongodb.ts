import { connect, Mongoose } from 'mongoose';
import { MONGODB_URI } from '../config/config';
import { syncTables } from '../models';
import { CLG_CODES } from '../utils/constants';

let DB: Mongoose;

const initDbConnection = async (): Promise<boolean> => {
    try {
        console.log(`DB Connection: ${CLG_CODES.YELLOW}PENDING${CLG_CODES.RESET}`);
        DB = await connect(MONGODB_URI);

        if (DB && DB.connection.name) {
            console.log(`${CLG_CODES.LINE_DEL}DB Connection: ${CLG_CODES.GREEN}SUCCESS${CLG_CODES.RESET}`);
            console.log(`Connection Name: ${CLG_CODES.GREEN}${DB.connection.name}${CLG_CODES.RESET}`);
            return await syncTables(DB);
        } else {
            throw new Error('Database connection has failed.');
        }
    } catch (error) {
        console.log(`${CLG_CODES.LINE_DEL}DB Connection: ${CLG_CODES.RED}FAILED  ${CLG_CODES.RESET}`);
        console.error('ERROR Connecting Mongo DB', error);
        return false;
    }
};

export { initDbConnection };
