/// <reference types="multer" />
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    create(createChannelDto: CreateChannelDto): Promise<{
        id: number;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Channel[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    addMember({ channelId, userId }: {
        channelId: string;
        userId: string;
    }): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    removeMember({ channelId, userId }: {
        channelId: string;
        userId: string;
    }): Promise<import(".prisma/client").Channel>;
    findAllMembers(channelId: string): import(".prisma/client").Prisma.Prisma__ChannelClient<{
        members: import(".prisma/client").User[];
    }>;
    findByUserId(userId: string): Promise<import(".prisma/client").Channel[]>;
    update(id: string, updateChannelDto: UpdateChannelDto): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    findChannelsAndMessages(userId: string): Promise<{
        channels: import(".prisma/client").Channel[];
        messages: any[];
    }>;
    updateImage(id: string, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        image: string;
        createdAt: Date;
    }>;
}
