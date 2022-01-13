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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpErrorFilter = class HttpErrorFilter {
    constructor() {
        this.logger = new common_1.Logger();
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? exception.message
            : "Internal server error";
        const devErrorResponse = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorName: exception === null || exception === void 0 ? void 0 : exception.name,
            message: exception === null || exception === void 0 ? void 0 : exception.message,
        };
        const prodErrorResponse = {
            statusCode,
            message,
        };
        this.logger.log(`request method: ${request.method} request url${request.url}`, JSON.stringify(devErrorResponse));
        response
            .status(statusCode)
            .json(process.env.NODE_ENV === "development"
            ? devErrorResponse
            : prodErrorResponse);
    }
};
HttpErrorFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [])
], HttpErrorFilter);
exports.HttpErrorFilter = HttpErrorFilter;
//# sourceMappingURL=ErrorFilter.js.map