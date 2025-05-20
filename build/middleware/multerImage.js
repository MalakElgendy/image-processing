"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path_1.default.join(__dirname, '../../uploads');
        try {
            if (!fs_1.default.existsSync(uploadPath)) {
                console.log('creating uploads dirc');
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            }
            console.log('Multer Storage Destination Triggered diskStorage');
            console.log(`Destination path diskStorage: ${path_1.default.join(__dirname, '../../uploads')}`);
            callback(null, uploadPath);
        }
        catch (err) {
            console.error('Error creating uploads directory:', err);
            callback(err, uploadPath);
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    console.log('Multer File Filter Triggered');
    console.log(`Uploaded file: ${file.originalname}`);
    console.log(`File extension: ${ext}`);
    if (ext === '.jpg') {
        cb(null, true);
    }
    else {
        cb(new Error('only jpg files are allowed'));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
