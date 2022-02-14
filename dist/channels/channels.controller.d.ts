import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    create(createChannelDto: CreateChannelDto): import(".prisma/client").Prisma.Prisma__ChannelClient<{
        id: number;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Channel[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    addMember(channelId: string, userId: string): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    findAllMembers(channelId: string): import(".prisma/client").Prisma.Prisma__ChannelClient<{
        members: import(".prisma/client").User[];
    }>;
    findByUserId(userId: string): import(".prisma/client").PrismaPromise<import(".prisma/client").Channel[]>;
    update(id: string, updateChannelDto: UpdateChannelDto): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ChannelClient<import(".prisma/client").Channel>;
}
