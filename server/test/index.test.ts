import request from 'supertest';
import server from '../index';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';


describe('Server', () => {

    beforeEach(() => {
        if (server.httpServer.listening)
            server.httpServer.close(() => server.httpServer.listen());
        else server.httpServer.listen();
    });

    afterEach(() => {
        server.httpServer.close();
    });

    describe('GET /end-point', () => {
        it('should respond with a 200 status code and a JSON object with a "hello" property set to "world!"', async () => {
            const response = await request(server.application)
                .get('/end-point')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body).to.deep.equal({ hello: 'world!' });
        });
    });

    describe('GET /status', () => {
        it('should respond with a 200 status code and a JSON object with a "users" property set to an array', async () => {
            const response = await request(server.application)
                .get('/status')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body).to.have.property('users')
        });
    });

    describe('GET /wrong-api', () => {
        it('should respond with a 400 status code and a JSON object empty', async () => {
            const response = await request(server.application)
                .get('/wrong-api')
                .expect('Content-Type', /json/)
                .expect(404);
        });
    });

})