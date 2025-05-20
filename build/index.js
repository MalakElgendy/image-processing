"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const images_1 = __importDefault(require("./routes/images"));
const upload_1 = __importDefault(require("./routes/upload"));
const fs_1 = __importDefault(require("fs"));
const port = 3000;
exports.app = (0, express_1.default)();
// Correctly typed Request and Response
exports.app.get('/api', (req, res) => {
    res.status(200).send('API is working!');
});
exports.app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
exports.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads'))); // Serve files from uploads directory
exports.app.use('/thumbs', express_1.default.static(path_1.default.join(__dirname, '../thumbs')));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'front-end')));
exports.app.use('/api/upload', upload_1.default);
exports.app.use('/api/resize', images_1.default);
exports.app.get('/api/images', (req, res) => {
    const imagesPath = path_1.default.join(__dirname, '..', 'images');
    const uploadsPath = path_1.default.join(__dirname, '..', 'uploads');
    const images = [
        ...fs_1.default.readdirSync(imagesPath),
        ...fs_1.default.readdirSync(uploadsPath),
    ];
    res.json(images.filter((file) => file.endsWith('.jpg')));
});
exports.app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
