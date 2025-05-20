import { resizeImage } from '../utils/imageProcess';
import fs from 'fs';
import path from 'path';
const galleryImages = [
  'fjord.jpg',
  'icelandwaterfall.jpg',
  'palmtunnel.jpg',
  'santamonica.jpg',
];
const dimensions = [
  { width: 100, height: 100 },
  { width: 200, height: 150 },
  { width: 300, height: 300 },
];
describe('image processing', () => {
  const generatedFiles: string[] = [];
  galleryImages.forEach((filename) => {
    dimensions.forEach(({ width, height }) => {
      const outputName = `${filename}_${width}x${height}.jpg`;
      const outputPath = path.join('thumbs', outputName);

      it('should resize filename to width*height', async () => {
        const result = await resizeImage(filename, width, height);
        expect(result).toBeDefined();
        expect(fs.existsSync(outputPath)).toBeTrue();
        generatedFiles.push(outputPath);
      });
    });
  });
  it('should throw and error if image doent exist', async () => {
    try {
      await resizeImage('nonexistent.jpg', 100, 100);
    } catch (error) {
      expect(error).toBeDefined();
      expect((error as Error).message).toBe('File not found.');
    }
  });
  afterAll(() => {
    generatedFiles.forEach((filepath) => {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    });
  });
});
