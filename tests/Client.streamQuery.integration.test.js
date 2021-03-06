import * as bootstrap from './bootstrap';
import Client from '../src/Client';
import QueryStream from 'pg-query-stream';
import {ReadableStreamAsyncReader} from '@cookielab.io/stream-async-wrappers';

describe('client database integration', () => {
    let client = null;

    beforeAll(() => {
        client = new Client(bootstrap.createPool());
    });

    afterAll(async () => {
        await client.end();
    });

    it('performs a successful query stream', async () => {
        const stream = await client.streamQuery('SELECT 42 AS theAnswer');

        expect(stream).toBeInstanceOf(QueryStream);
        const reader = new ReadableStreamAsyncReader(stream);
        let row = null;
        do {
            row = await reader.read();
            if (row != null) {
                expect(row.theanswer).toBe(42);
            }
        } while (row != null);
        stream.close();
    });

    it('performs a failing query stream', async () => {
        const stream = await client.streamQuery('SELECT 42 AS theAnswer FROM unknown_table');

        expect(stream).toBeInstanceOf(QueryStream);
        const reader = new ReadableStreamAsyncReader(stream);
        await expect(reader.read()).rejects.toEqual(new Error('relation "unknown_table" does not exist'));
        stream.close();
    });
});
