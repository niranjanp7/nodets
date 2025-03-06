import http from 'http';
import path from 'path';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import { HOSTNAME, PORT } from './config/config';

import { FileReaderRouter, UploadRouter, AuthRouter, ProductRouter, InventoryRouter } from './routes';
import { accessControlAllowOrigin } from './utils/helper';
import { LogsMiddleware } from './middleware';
import { initDbConnection } from './db/mongodb';

export const APP = express();
export let HTTP_SERVER: ReturnType<typeof http.createServer>;

const main = async () => {
    console.clear();

    const DB_STATUS = await initDbConnection();

    if (!DB_STATUS) {
        console.error('FAILED TO CONNECT DATABASE');
        console.error('SERVER TERMINATED');
        return;
    }

    APP.use(urlencoded({ extended: true }), json(), LogsMiddleware.logRequestInfo, accessControlAllowOrigin, cookieParser());

    APP.set('view engine', 'pug');
    APP.set('views', path.join(__dirname, 'views'));

    // HOME
    APP.get('/', (_, res) => {
        res.status(200).send('WELCOME');
    });

    // EXTERNAL ROUTES
    APP.use('/fileread', FileReaderRouter);
    APP.use('/upload', UploadRouter);
    APP.use('/auth', AuthRouter);
    APP.use('/product', ProductRouter);
    APP.use('/inventory', InventoryRouter);

    // SERVE HTML BUILD
    // APP.use('/', express.static(path.join(__dirname, '..', 'build', 'build')));
    // APP.get('/v2/*', (req, res) => {
    //     if (req.originalUrl.startsWith('/v2')) {
    //         res.sendFile(path.join(__dirname, '..', 'build', 'build', 'index.html'));
    //     } else {
    //         const path = req.originalUrl === '/' ? '' : req.originalUrl;
    //         res.redirect(301, '/v2' + path);
    //     }
    // });

    // NOT FOUND
    APP.use((_, res) => {
        res.status(404).send({ error: true, message: 'ERROR 404 : Not Found' });
    });

    // SERVER CODE
    HTTP_SERVER = http.createServer(APP);

    HTTP_SERVER.listen(PORT, HOSTNAME, () => {
        console.log(`SERVER STARTED : http://${HOSTNAME}:${PORT}`);
    });
};

export const SHUT_DOWN = (callback: ((err?: Error | undefined) => void) | undefined) => HTTP_SERVER.close(callback);

main();
