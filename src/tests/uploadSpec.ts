jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // 20 seconds

import path from 'path';
import fs from 'fs';
import supertest from 'supertest';
import { app } from '../index'; // Adjust the path to your app entry point
const request = supertest(app);

describe('post /api/upload', () => {
  const testImagePath = path.join(__dirname, '..', '..', 'test-images', 'testimage.jpg');
  const uploadedPath = path.join(
    __dirname,'..','..','uploads','encenadaport.jpg',
  );
  if (!fs.existsSync(testImagePath)) {
    throw new Error(`Test image not found: ${testImagePath}`);
  }

  afterAll(() => {
    if (fs.existsSync(uploadedPath)) {
      fs.unlinkSync(uploadedPath);
    }
  });
  it('should upload an image successfully', async () => {
    console.log(`uploading test image${testImagePath}`)
    const res = await request
      .post('/api/upload')
      console.log('response',res.body)
    expect(res.status).toBe(200);
  });

  it('should reject request with no image', async () => {
    const res = await request.post('/api/upload');
    expect(res.status).toBe(400);
  });
});
