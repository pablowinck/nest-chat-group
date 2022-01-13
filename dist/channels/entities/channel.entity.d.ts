import { Message } from "@prisma/client";
import { User } from "src/users/entities/user.entity";
export declare class Channel {
    id: number;
    name: string;
    topic: string;
    image: string;
    members: User[];
    messages: Message[];
    isPrivate: boolean;
    password: string;
}
