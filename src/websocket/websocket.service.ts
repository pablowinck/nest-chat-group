import { forwardRef, Inject } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { MessagesService } from "src/messages/messages.service";
import { UsersService } from "src/users/users.service";
@WebSocketGateway({ cors: true })
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private connectedClients = [];

  @Inject(forwardRef(() => MessagesService))
  private messagesService: MessagesService;

  @Inject(forwardRef(() => UsersService))
  private usersService: UsersService;

  handleConnection(client: Socket) {
    // client.disconnect(true);
    this.connectedClients.push(client);

    client.join(client.id);

    for (const [index, c] of this.connectedClients.entries()) {
      if (c.idUser == client.handshake.query.uid) {
        this.connectedClients.splice(index, 1);
      }
    }
    // receber usuario
    // verificar canais que é membro
    // 'joinar' o usuario nos rooms / channels
  }

  @SubscribeMessage("join")
  onJoin(@ConnectedSocket() client: Socket, @MessageBody() channelId: string) {
    client.rooms.forEach((room) => {
      client.leave(room);
    });
    if (!channelId) return;

    console.log("[onJoin]", channelId);
    client.join(channelId);

    console.log("[onJoin]", client.id);
    client.join(client.id);
  }

  @SubscribeMessage("send-message")
  listenForMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: CreateMessageDto
  ) {
    console.log("[WebsocketService] send-message", message);

    console.log("[rooms]", client.rooms);
    console.log("[current room]", "" + message.channelId);
    console.log("[index 0 rooms]", client.rooms.values().next().value);

    this.messagesService.create(message).then((newMessage) => {
      this.usersService.findOne(newMessage.userId).then((user) => {
        this.server.sockets
          .in(client.rooms.values().next().value)
          .emit("new-message", {
            user: user,
            content: newMessage.text,
            createdAt: newMessage.createdAt,
          });
      });
    });
  }
}
