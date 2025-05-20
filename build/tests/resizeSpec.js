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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.app);
describe('get /api/resize', () => {
    const filename = 'fjord.jpg';
    const width = 150;
    const height = 100;
    const thumbPath = path_1.default.join('thumbs', `${filename}_${width}x${height}.jpg`);
    afterAll(() => {
        if (fs_1.default.existsSync(thumbPath)) {
            fs_1.default.unlinkSync(thumbPath);
        }
    });
    it('should return resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/resize?filename=${filename}&width=${width}&height=${height}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toContain('image/jpeg');
        expect(fs_1.default.existsSync(thumbPath)).toBeTrue();
    }));
    it('should return 404 for missing params', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/resize?filename=fjord.jpg');
        expect(res.status).toBe(400);
    }));
    it('should return 400 for invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/resize?filename=fjord.jpg&width=abc&height=100');
        expect(res.status).toBe(400);
        expect(res.text).toContain('width and height must be valid number');
    }));
    it('should return 500 for non-existend image', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/resize?filename=notfound.jpg&width=100&height=100');
        expect(res.status).toBe(500);
    }));
});
