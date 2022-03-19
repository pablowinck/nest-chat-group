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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const create_message_dto_1 = require("../messages/dto/create-message.dto");
const messages_service_1 = require("../messages/messages.service");
const users_service_1 = require("../users/users.service");
let WebsocketService = class WebsocketService {
    constructor() {
        this.connectedClients = [];
    }
    handleConnection(client) {
        this.connectedClients.push(client);
        client.join(client.id);
        for (const [index, c] of this.connectedClients.entries()) {
            if (c.idUser == client.handshake.query.uid) {
                this.connectedClients.splice(index, 1);
            }
        }
    }
    onJoin(client, channelId) {
        client.rooms.forEach((room) => {
            client.leave(room);
        });
        if (!channelId)
            return;
        console.log("[onJoin]", channelId);
        client.join(channelId);
        console.log("[onJoin]", client.id);
        client.join(client.id);
    }
    listenForMessages(client, message) {
        console.log("[WebsocketService] send-message", message);
        console.log("[rooms]", client.rooms);
        console.log("[current room]", "" + message.channelId);
        console.log("[index 0 rooms]", client.rooms.values().next().value);
        this.messagesService.create(message).then((newMessage) => {
            this.usersService.findOne(newMessage.userId).then((user) => {
                this.server.sockets
                    .in(client.rooms.values().next().value)
                    .emit("new-message", {
                    user: user,
                    content: newMessage.text,
                    createdAt: newMessage.createdAt,
                });
            });
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketService.prototype, "server", void 0);
__decorate([
    (0, common_1.Inject)((0, common_1.forwardRef)(() => messages_service_1.MessagesService)),
    __metadata("design:type", messages_service_1.MessagesService)
], WebsocketService.prototype, "messagesService", void 0);
__decorate([
    (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService)),
    __metadata("design:type", users_service_1.UsersService)
], WebsocketService.prototype, "usersService", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("join"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WebsocketService.prototype, "onJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("send-message"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], WebsocketService.prototype, "listenForMessages", null);
WebsocketService = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], WebsocketService);
exports.WebsocketService = WebsocketService;
//# sourceMappingURL=websocket.service.js.map