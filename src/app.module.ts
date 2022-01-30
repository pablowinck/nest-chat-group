import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChannelsModule } from "./channels/channels.module";
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
  ],
})
export class AppModule {}
