import { Channel, User } from "@prisma/client";

export class Message {
  id: number;
  text: string;
  createdAt: Date;
  user: User;
  channel: Channel;
}
