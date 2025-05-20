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
const express_1 = __importDefault(require("express"));
const imageProcess_1 = require("../utils/imageProcess");
const imageRouter = express_1.default.Router();
imageRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    console.log('resize request recevied', { filename, width, height });
    if (!filename || !width || !height) {
        res.status(400).send('filename,width,and height are required');
        return;
    }
    const widthNum = parseInt(width);
    const heightNum = parseInt(height);
    if (isNaN(widthNum) || isNaN(heightNum)) {
        res.status(400).send('width and height must be valid number');
        return;
    }
    try {
        const resizedImagePath = yield (0, imageProcess_1.resizeImage)(filename, widthNum, heightNum);
        if (!resizedImagePath) {
            res.status(500).send('Failed to process the image');
            return;
        }
        //res.sendFile(resizedImagePath);
        res.sendFile(resizedImagePath);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = imageRouter;
