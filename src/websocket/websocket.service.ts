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
  onJoin(@ConnectedSocket() client: Socket, @MessageBody() channel: string[]) {
    // client.rooms.clear();
    client.rooms.forEach((room) => {
      client.leave(room);
    });
    if (!channel || !channel[0]) return;

    console.log("[onJoin]", channel[1]);
    client.join(channel[1]);

    console.log("[onJoin]", client.id);
    client.join(client.id);

    console.log("[allRooms]", client.rooms);

    this.messagesService.findByChannelId(+channel[0]).then((messages) => {
      this.server.to(client.id).emit(
        "load-messages",
        messages.map((message) => {
          return {
            user: message.user,
            content: message.text,
            createdAt: message.createdAt,
          };
        })
      );
    });
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
