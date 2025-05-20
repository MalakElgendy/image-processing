import { app } from '../index';
import supertest from 'supertest';
const request = supertest(app);
describe('GET /api/images', () => {
  it('should return a list of jpg images', async () => {
    const res = await request.get('/api/images');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
    res.body.forEach((img: string) => expect(img.endsWith('.jpg')).toBeTrue());
  });
});
