"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multerImage_1 = __importDefault(require("../middleware/multerImage"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (req, res) => {
    multerImage_1.default.single('image')(req, res, (err) => {
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
exports.default = router;
