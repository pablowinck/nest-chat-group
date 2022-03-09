import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findByChannelId(channelId: string): import(".prisma/client").PrismaPromise<{
        id: number;
        text: string;
        createdAt: Date;
        user: {
            id: number;
            name: string;
            profileImage: string;
            email: string;
        };
    }[]>;
    create(createMessageDto: CreateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Message[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    update(id: string, updateMessageDto: UpdateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
}
