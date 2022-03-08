import { Module } from "@nestjs/common";
import { ChannelsService } from "src/channels/channels.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ChannelsService],
})
export class UsersModule {}
