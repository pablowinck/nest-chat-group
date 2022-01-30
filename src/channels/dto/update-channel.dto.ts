import { PartialType } from "@nestjs/mapped-types";
import { CreateChannelDto } from "./create-channel.dto";

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  id: number;
  name: string;
  topic: string;
  image: string;
  isPrivate: boolean;
  password: string;
}
