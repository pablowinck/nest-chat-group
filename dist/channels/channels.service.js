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
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChannelsService = class ChannelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChannelDto) {
        const createdChannel = await this.prisma.channel.create({
            data: {
                name: createChannelDto.name,
                topic: createChannelDto.topic,
                image: createChannelDto.image,
                isPrivate: createChannelDto.isPrivate,
                password: createChannelDto.password,
                createdAt: new Date(),
            },
            select: {
                id: true,
            },
        });
        await this.addMember(createdChannel.id, +createChannelDto.userId);
        return createdChannel;
    }
    findAll() {
        return this.prisma.channel.findMany();
    }
    findOne(id) {
        if (!id)
            throw new common_1.HttpException("id is required", common_1.HttpStatus.BAD_REQUEST);
        const channel = this.prisma.channel.findUnique({
            where: { id: id },
            rejectOnNotFound: true,
        });
        if (!channel)
            throw new common_1.HttpException("Channel not found", common_1.HttpStatus.NOT_FOUND);
        return channel;
    }
    update(id, updateChannelDto) {
        this.findOne(id);
        return this.prisma.channel.update({
            where: { id },
            data: updateChannelDto,
        });
    }
    addMember(channelId, userId) {
        this.findOne(channelId);
        return this.prisma.channel.update({
            where: { id: channelId },
            data: {
                members: {
                    connect: { id: userId },
                },
            },
        });
    }
    findAllMembers(channelId) {
        this.findOne(channelId);
        return this.prisma.channel.findUnique({
            where: { id: channelId },
            select: { members: true },
        });
    }
    async findChannelsByUserId(userId) {
        return await this.prisma.channel.findMany({
            where: {
                members: {
                    some: { id: userId },
                },
            },
        });
    }
    remove(id) {
        this.findOne(id);
        return this.prisma.channel.delete({ where: { id } });
    }
    async findChannelsAndMessages(userId) {
        const channels = await this.findChannelsByUserId(userId);
        if (channels.length === 0)
            return { channels: [], messages: [] };
        const messages = await this.prisma.message.findMany({
            where: { channel: { id: channels[0].id } },
            select: {
                id: true,
                text: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        let responseMessages = [];
        messages.forEach((message) => {
            responseMessages.push({
                user: message.user,
                content: message.text,
                createdAt: message.createdAt,
            });
        });
        return { channels, messages: responseMessages };
    }
};
ChannelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelsService);
exports.ChannelsService = ChannelsService;
//# sourceMappingURL=channels.service.js.map