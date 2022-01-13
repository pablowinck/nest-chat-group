import { OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";
export declare class WebsocketService implements OnGatewayConnection {
    server: Server;
    private messages;
    private connectedClients;
    handleConnection(client: Socket): void;
    onJoin(user: User): void;
    listenForMessages(client: Socket, message: string): void;
}
