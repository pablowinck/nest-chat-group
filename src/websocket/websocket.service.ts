import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";
@WebSocketGateway({ cors: true })
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private messages = [];

  private connectedClients = [];

  handleConnection(client: Socket) {
    this.connectedClients.push(client);

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
  onJoin(user: User) {}

  @SubscribeMessage("send-message")
  listenForMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string
  ) {
    this.messages.push(message);
    client.broadcast.emit("new-message", message);
  }
}
