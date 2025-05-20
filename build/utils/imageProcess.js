"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/*
const imagesPath= path.join("images/original", filename);

//const imagesPath =path.join(__dirname,"..","..","images")

const thumbPath =path.join(__dirname,"..","..","thumbs")

if(!fs.existsSync(thumbPath)){
    fs.mkdirSync(thumbPath)
}
*/
const resizeImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const inputPath = path_1.default.join(__dirname, '../../uploads', filename);
    const outputFilename = `${filename}_${width}x${height}.jpg`; // Replace '*' with 'x'
    const outputPath = path_1.default.join(__dirname, '../../thumbs', outputFilename);
    console.log('Input Path:', inputPath);
    console.log('Output Filename:', outputFilename);
    console.log('Output Path:', outputPath);
    if (!fs_1.default.existsSync(inputPath)) {
        throw new Error('File not found.');
    }
    // Ensure the 'thumbs' directory exists
    const thumbPath = path_1.default.join('thumbs');
    if (!fs_1.default.existsSync(thumbPath)) {
        fs_1.default.mkdirSync(thumbPath);
    }
    if (!fs_1.default.existsSync(outputPath)) {
        yield (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
    }
    return path_1.default.resolve(outputPath);
});
exports.resizeImage = resizeImage;
