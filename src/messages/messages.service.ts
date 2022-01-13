import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMessageDto: CreateMessageDto) {
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

  findOne(id: number) {
    if (!id) throw new HttpException("id is required", HttpStatus.BAD_REQUEST);
    const message = this.prisma.message.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });

    if (!message)
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND);
    return message;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    this.findOne(id);
    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
    });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.message.delete({ where: { id } });
  }
}
