"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const sharp_1 = __importDefault(require("sharp"));
const crypto_1 = __importDefault(require("crypto"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
let S3Service = class S3Service {
    constructor() {
        this.limitSize = 1024 * 1024;
        this.types = ['png', 'jpg', 'jpeg'];
    }
    async upload(file) {
        if (!file)
            throw new common_1.HttpException('File not found', common_1.HttpStatus.BAD_REQUEST);
        const { mimetype, size, buffer } = file;
        if (size > this.limitSize) {
            throw new common_1.HttpException(`File size is too large. Max size is ${this.limitSize} bytes.`, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!this.types.includes(mimetype.split('/')[1])) {
            throw new common_1.HttpException(`File type is not supported. Supported types are ${this.types.join(', ')}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const fileName = `${Date.now()}-${crypto_1.default.randomUUID()}`;
        const bufferOptimized = await (0, sharp_1.default)(buffer)
            .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 70, progressive: true })
            .toBuffer();
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${fileName}.jpg`,
            Body: bufferOptimized,
            ACL: 'public-read',
            ContentType: mimetype,
        };
        const { Location, Key } = await s3.upload(params).promise();
        return {
            location: Location,
            key: Key,
        };
    }
    getKeyFromUrl(url) {
        return url.split('/').pop();
    }
    async delete(key) {
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
        };
        await s3.deleteObject(params).promise();
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map