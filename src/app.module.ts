import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { S3Service } from "./aws/s3.service";
import { ChannelsModule } from "./channels/channels.module";
import { ChannelsService } from "./channels/channels.service";
import { MessagesModule } from "./messages/messages.module";
import { MessagesService } from "./messages/messages.service";
import { PrismaService } from "./prisma/prisma.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
import { WebsocketService } from "./websocket/websocket.service";

@Module({
  imports: [UsersModule, ChannelsModule, MessagesModule],
  controllers: [AppController],
  providers: [
    AppService,
    WebsocketService,
    PrismaService,
    MessagesModule,
    MessagesService,
    UsersService,
    ChannelsService,
    S3Service
  ],
})
export class AppModule {}
