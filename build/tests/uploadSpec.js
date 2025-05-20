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
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // 20 seconds
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Adjust the path to your app entry point
const request = (0, supertest_1.default)(index_1.app);
describe('post /api/upload', () => {
    const testImagePath = path_1.default.join(__dirname, '..', '..', 'test-images', 'testimage.jpg');
    const uploadedPath = path_1.default.join(__dirname, '..', '..', 'uploads', 'encenadaport.jpg');
    if (!fs_1.default.existsSync(testImagePath)) {
        throw new Error(`Test image not found: ${testImagePath}`);
    }
    afterAll(() => {
        if (fs_1.default.existsSync(uploadedPath)) {
            fs_1.default.unlinkSync(uploadedPath);
        }
    });
    it('should upload an image successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`uploading test image${testImagePath}`);
        const res = yield request
            .post('/api/upload');
        console.log('response', res.body);
        expect(res.status).toBe(200);
    }));
    it('should reject request with no image', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/upload');
        expect(res.status).toBe(400);
    }));
});
