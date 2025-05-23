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
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.app);
describe('GET /api/images', () => {
    it('should return a list of jpg images', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/images');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTrue();
        res.body.forEach((img) => expect(img.endsWith('.jpg')).toBeTrue());
    }));
});
