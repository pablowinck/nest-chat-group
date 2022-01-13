import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Message[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    update(id: string, updateMessageDto: UpdateMessageDto): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message>;
}
