import { PrismaService } from "src/prisma/prisma.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
export declare class ChannelsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createChannelDto: CreateChannelDto): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Channel[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    update(id: number, updateChannelDto: UpdateChannelDto): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    addMember(channelId: number, userId: number): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    findAllMembers(channelId: number): import(".prisma/client").Prisma.Prisma__ChannelClient<{
        members: import(".prisma/client").User[];
    }>;
    findChannelsByUserId(userId: number): import(".prisma/client").PrismaPromise<import(".prisma/client").Channel[]>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
}
