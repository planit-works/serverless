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
exports.handler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_json_1 = __importDefault(require("./config.json"));
const s3 = new client_s3_1.S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: config_json_1.default.S3_ID,
        secretAccessKey: config_json_1.default.S3_SECRET,
    },
});
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { folder } = event.pathParameters;
    const params = {
        Bucket: config_json_1.default.S3_BUCKET,
        Key: `${folder}/${Date.now()}`,
        ACL: 'public-read',
    };
    const command = new client_s3_1.PutObjectCommand(params);
    const presignedURL = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 600 });
    const response = {
        statusCode: 200,
        body: JSON.stringify(presignedURL),
    };
    return response;
});
exports.handler = handler;
