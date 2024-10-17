import http from 'http';
import express, { json, urlencoded } from 'express';
import { HOSTNAME, PORT } from './config/config';

export const APP = express();
export let HTTP_SERVER: ReturnType<typeof http.createServer>;

const main = () => {
    APP.use(urlencoded({ extended: true }));
    APP.use(json());

    APP.get('/', (_req, res) => {
        return res.status(200).send("WELCOME");
    });

    HTTP_SERVER = http.createServer(APP);

    HTTP_SERVER.listen(PORT, HOSTNAME, () => {
        console.log(`SERVER STARTED : http://${HOSTNAME}:${PORT}`);
    });
}

export const SHUTDOWN = (callback: ((err?: Error | undefined) => void) | undefined) => HTTP_SERVER.close(callback);

main();