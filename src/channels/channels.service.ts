import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createChannelDto: CreateChannelDto) {
    return this.prisma.channel.create({
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
  }

  findAll() {
    return this.prisma.channel.findMany();
  }

  findOne(id: number) {
    if (!id) throw new HttpException("id is required", HttpStatus.BAD_REQUEST);
    const channel = this.prisma.channel.findUnique({
      where: { id: id },
      rejectOnNotFound: true,
    });
    if (!channel)
      throw new HttpException("Channel not found", HttpStatus.NOT_FOUND);
    return channel;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    this.findOne(id);
    return this.prisma.channel.update({
      where: { id },
      data: updateChannelDto,
    });
  }

  addMember(channelId: number, userId: number) {
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

  findAllMembers(channelId: number) {
    this.findOne(channelId);
    return this.prisma.channel.findUnique({
      where: { id: channelId },
      select: { members: true },
    });
  }

  async findChannelsByUserId(userId: number) {
    return await this.prisma.channel.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
    });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.channel.delete({ where: { id } });
  }

  async findChannelsAndMessages(userId: number) {
    const channels = await this.findChannelsByUserId(userId);

    if (channels.length === 0) return { channels: [], messages: [] };

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
}
