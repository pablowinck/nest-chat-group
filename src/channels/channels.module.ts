import { Module } from "@nestjs/common";
import { S3Service } from "src/aws/s3.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService, PrismaService, S3Service],
})
export class ChannelsModule {}
