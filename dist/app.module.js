"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const s3_service_1 = require("./aws/s3.service");
const channels_module_1 = require("./channels/channels.module");
const channels_service_1 = require("./channels/channels.service");
const messages_module_1 = require("./messages/messages.module");
const messages_service_1 = require("./messages/messages.service");
const prisma_service_1 = require("./prisma/prisma.service");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
const websocket_service_1 = require("./websocket/websocket.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, channels_module_1.ChannelsModule, messages_module_1.MessagesModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            websocket_service_1.WebsocketService,
            prisma_service_1.PrismaService,
            messages_module_1.MessagesModule,
            messages_service_1.MessagesService,
            users_service_1.UsersService,
            channels_service_1.ChannelsService,
            s3_service_1.S3Service
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map