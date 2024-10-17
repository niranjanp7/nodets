import request from 'supertest';

import { APP, SHUTDOWN } from '../../src';

describe('Application', () => {

    afterAll((done) => {
        SHUTDOWN(done)
    });

    it('TEST ENVIRONMENT', async () => {

        expect(process.env.NODE_ENV).toBe('test');
        expect(APP).toBeDefined();

    }, 10000);

    it('HELTH CHECK', async () => {

        const res = await request(APP).get('/');

        expect(res.status).toBe(200);
    });

    it('NOT FOUND', async () => {

        const res = await request(APP).get('/any');

        expect(res.status).toBe(404);
    });
});