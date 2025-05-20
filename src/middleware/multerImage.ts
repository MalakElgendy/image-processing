import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    try {
      if (!fs.existsSync(uploadPath)) {
        console.log('creating uploads dirc');
        fs.mkdirSync(uploadPath, { recursive: true });

      }
      console.log('Multer Storage Destination Triggered diskStorage');
      console.log(
        `Destination path diskStorage: ${path.join(__dirname, '../../uploads')}`,
      );
      callback(null, uploadPath);
    } catch (err) {
      console.error('Error creating uploads directory:', err);
      callback(err as Error, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  console.log('Multer File Filter Triggered');
  console.log(`Uploaded file: ${file.originalname}`);
  console.log(`File extension: ${ext}`);
  if (ext === '.jpg') {
    cb(null, true);
  } else {
    cb(new Error('only jpg files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
