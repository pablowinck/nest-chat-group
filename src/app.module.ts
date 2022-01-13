import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChannelsModule } from "./channels/channels.module";
import { MessagesModule } from "./messages/messages.module";
import { PrismaService } from "./prisma/prisma.service";
import { UsersModule } from "./users/users.module";
import { WebsocketService } from "./websocket/websocket.service";

@Module({
  imports: [UsersModule, ChannelsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, WebsocketService, PrismaService, MessagesModule],
})
export class AppModule {}
