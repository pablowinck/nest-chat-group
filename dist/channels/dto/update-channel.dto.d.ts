import { CreateChannelDto } from "./create-channel.dto";
declare const UpdateChannelDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateChannelDto>>;
export declare class UpdateChannelDto extends UpdateChannelDto_base {
    id: number;
    name: string;
    topic: string;
    image: string;
    isPrivate: boolean;
    password: string;
}
export {};
