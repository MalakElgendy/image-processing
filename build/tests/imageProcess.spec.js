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
const imageProcess_1 = require("../utils/imageProcess");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
    const generatedFiles = [];
    galleryImages.forEach((filename) => {
        dimensions.forEach(({ width, height }) => {
            const outputName = `${filename}_${width}x${height}.jpg`;
            const outputPath = path_1.default.join('thumbs', outputName);
            it('should resize filename to width*height', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, imageProcess_1.resizeImage)(filename, width, height);
                expect(result).toBeDefined();
                expect(fs_1.default.existsSync(outputPath)).toBeTrue();
                generatedFiles.push(outputPath);
            }));
        });
    });
    it('should throw and error if image doent exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, imageProcess_1.resizeImage)('nonexistent.jpg', 100, 100);
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('File not found.');
        }
    }));
    afterAll(() => {
        generatedFiles.forEach((filepath) => {
            if (fs_1.default.existsSync(filepath)) {
                fs_1.default.unlinkSync(filepath);
            }
        });
    });
});
