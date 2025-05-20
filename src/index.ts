import express, { Request, Response } from 'express';
import path from 'path';
import imageRouter from './routes/images';
import uploadRouter from './routes/upload';
import fs from 'fs';
const port = 3000;
export const app = express();

// Correctly typed Request and Response
app.get('/api', (req: Request, res: Response) => {
  res.status(200).send('API is working!');
});
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Serve files from uploads directory

app.use('/thumbs', express.static(path.join(__dirname, '../thumbs')));
app.use(express.static(path.join(__dirname, '..', 'front-end')));

app.use('/api/upload', uploadRouter);

app.use('/api/resize', imageRouter);
app.get('/api/images', (req: Request, res: Response) => {
  const imagesPath = path.join(__dirname, '..', 'images');
  const uploadsPath = path.join(__dirname, '..', 'uploads');

  const images = [
    ...fs.readdirSync(imagesPath),
    ...fs.readdirSync(uploadsPath),
  ];

  res.json(images.filter((file) => file.endsWith('.jpg')));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
