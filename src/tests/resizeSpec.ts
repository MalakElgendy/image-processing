import path from 'path';
import fs from 'fs';
import { app } from '../index';
import supertest from 'supertest';
const request = supertest(app);
describe('get /api/resize', () => {
  const filename = 'fjord.jpg';
  const width = 150;
  const height = 100;
  const thumbPath = path.join('thumbs', `${filename}_${width}x${height}.jpg`);
  afterAll(() => {
    if (fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath);
    }
  });
  it('should return resized image', async () => {
    const res = await request.get(
      `/api/resize?filename=${filename}&width=${width}&height=${height}`,
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/jpeg');
    expect(fs.existsSync(thumbPath)).toBeTrue();
  });
  it('should return 404 for missing params', async () => {
    const res = await request.get('/api/resize?filename=fjord.jpg');
    expect(res.status).toBe(400);
  });
  it('should return 400 for invalid input', async () => {
    const res = await request.get(
      '/api/resize?filename=fjord.jpg&width=abc&height=100',
    );
    expect(res.status).toBe(400);
    expect(res.text).toContain('width and height must be valid number');
  });
  it('should return 500 for non-existend image', async () => {
    const res = await request.get(
      '/api/resize?filename=notfound.jpg&width=100&height=100',
    );
    expect(res.status).toBe(500);
  });
});
