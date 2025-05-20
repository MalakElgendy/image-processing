import { Request, Response } from 'express';
import upload from '../middleware/multerImage';
import express from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.log(req.file);
      console.error('Error in multer middleware:', err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log('File received:', req.file);
    if (!req.file) {
      return res.status(400).send('No file uploaded or invalid file type');
    }
    res.status(200);
  });
});
export default router;
