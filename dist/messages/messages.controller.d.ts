import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findByChannelId(channelId: string): import(".prisma/client").PrismaPromise<{
        createdAt: Date;
        id: number;
        user: {
            name: string;
            email: string;
            profileImage: string;
            id: number;
        };
        text: string;
    }[]>;
    create(createMessageDto: CreateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Message[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    update(id: string, updateMessageDto: UpdateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
}
