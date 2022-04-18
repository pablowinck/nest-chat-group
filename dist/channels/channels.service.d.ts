/// <reference types="multer" />
import { S3Service } from 'src/aws/s3.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelsService {
    private readonly prisma;
    private s3Service;
    constructor(prisma: PrismaService, s3Service: S3Service);
    create(createChannelDto: CreateChannelDto): Promise<{
        id: number;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Channel[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    update(id: number, updateChannelDto: UpdateChannelDto): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    addMember(channelId: number, userId: number): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    removeMember(channelId: number, userId: number): Promise<import(".prisma/client").Channel>;
    findAllMembers(channelId: number): import(".prisma/client").Prisma.Prisma__ChannelClient<{
        members: import(".prisma/client").User[];
    }>;
    findChannelsByUserId(userId: number): Promise<import(".prisma/client").Channel[]>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    findChannelsAndMessages(userId: number): Promise<{
        channels: import(".prisma/client").Channel[];
        messages: any[];
    }>;
    updateImage(id: number, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        image: string;
        createdAt: Date;
    }>;
}
