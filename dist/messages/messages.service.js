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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMessageDto) {
        return this.prisma.message.create({
            data: {
                text: createMessageDto.text,
                userId: createMessageDto.userId,
                channelId: createMessageDto.channelId,
                createdAt: new Date(),
            },
        });
    }
    findAll() {
        return this.prisma.message.findMany();
    }
    findOne(id) {
        if (!id)
            throw new common_1.HttpException("id is required", common_1.HttpStatus.BAD_REQUEST);
        const message = this.prisma.message.findUnique({
            where: { id },
            rejectOnNotFound: true,
        });
        if (!message)
            throw new common_1.HttpException("Message not found", common_1.HttpStatus.NOT_FOUND);
        return message;
    }
    findByChannelId(channelId) {
        if (!channelId)
            throw new common_1.HttpException("channelId is required", common_1.HttpStatus.BAD_REQUEST);
        return this.prisma.message.findMany({
            where: { channelId },
            select: {
                id: true,
                text: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    update(id, updateMessageDto) {
        this.findOne(id);
        return this.prisma.message.update({
            where: { id },
            data: updateMessageDto,
        });
    }
    remove(id) {
        this.findOne(id);
        return this.prisma.message.delete({ where: { id } });
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map