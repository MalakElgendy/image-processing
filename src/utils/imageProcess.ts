import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
/*
const imagesPath= path.join("images/original", filename);

//const imagesPath =path.join(__dirname,"..","..","images")

const thumbPath =path.join(__dirname,"..","..","thumbs")

if(!fs.existsSync(thumbPath)){
    fs.mkdirSync(thumbPath)
}
*/

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string | void> => {
  const inputPath = path.join(__dirname, '../../uploads', filename);
  const outputFilename = `${filename}_${width}x${height}.jpg`; // Replace '*' with 'x'
  const outputPath = path.join(__dirname, '../../thumbs', outputFilename);

  console.log('Input Path:', inputPath);
  console.log('Output Filename:', outputFilename);
  console.log('Output Path:', outputPath);

  if (!fs.existsSync(inputPath)) {
    throw new Error('File not found.');
  }

  // Ensure the 'thumbs' directory exists
  const thumbPath = path.join('thumbs');
  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }
  if (!fs.existsSync(outputPath)) {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
  }

  return path.resolve(outputPath);
};
