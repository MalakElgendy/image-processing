import express, { Request, Response } from 'express';
import { resizeImage } from '../utils/imageProcess';

const imageRouter = express.Router();

imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;
  console.log('resize request recevied', { filename, width, height });
  if (!filename || !width || !height) {
    res.status(400).send('filename,width,and height are required');
    return;
  }
  const widthNum = parseInt(width as string);
  const heightNum = parseInt(height as string);

  if (isNaN(widthNum) || isNaN(heightNum)) {
    res.status(400).send('width and height must be valid number');
    return;
  }
  try {
    const resizedImagePath = await resizeImage(
      filename as string,
      widthNum,
      heightNum,
    );
    if (!resizedImagePath) {
      res.status(500).send('Failed to process the image');
      return;
    }
    //res.sendFile(resizedImagePath);
    res.sendFile(resizedImagePath);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default imageRouter;
