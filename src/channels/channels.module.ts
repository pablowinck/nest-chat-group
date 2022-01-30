import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService, PrismaService],
})
export class ChannelsModule {}
