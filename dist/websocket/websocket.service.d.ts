import { OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
export declare class WebsocketService implements OnGatewayConnection {
    server: Server;
    private connectedClients;
    private messagesService;
    private usersService;
    handleConnection(client: Socket): void;
    onJoin(client: Socket, channel: string[]): void;
    listenForMessages(client: Socket, message: CreateMessageDto): void;
}
