import { Channel, User } from "@prisma/client";
export declare class Message {
    id: number;
    text: string;
    createdAt: Date;
    user: User;
    channel: Channel;
}
