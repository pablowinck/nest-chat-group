import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMessageDto: CreateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Message[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    findByChannelId(channelId: number): import(".prisma/client").PrismaPromise<{
        text: string;
        createdAt: Date;
        user: {
            id: number;
            name: string;
            profileImage: string;
            email: string;
        };
        id: number;
    }[]>;
    update(id: number, updateMessageDto: UpdateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
}
