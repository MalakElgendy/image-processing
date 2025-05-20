import supertest from 'supertest';
import { app } from '../index';

const request = supertest(app);

describe('api root', () => {
  it('should respond with api', async () => {
    const res = await request.get('/api');
    expect(res.status).toBe(200);
    expect(res.text).toBe('api is working');
  });
});
