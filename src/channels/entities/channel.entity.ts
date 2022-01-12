import { User } from "src/users/entities/user.entity";

export class Channel {
  id: number;
  name: string;
  topic: string;
  image: string;
  members: User[];
  messages: Message[];
  private: {
    isPrivate: boolean;
    password: string;
  };
  isSelected: boolean;
  hasNotifications: boolean;
}

export type Message = {
  user: User;
  content: string;
  createdAt: Date;
};
