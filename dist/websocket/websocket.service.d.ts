import { OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class WebsocketService implements OnGatewayConnection {
    server: Server;
    private messages;
    handleConnection(client: Socket): void;
    listenForMessages(client: Socket, message: string): void;
}
