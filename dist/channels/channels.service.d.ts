import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelsService {
    create(createChannelDto: CreateChannelDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChannelDto: UpdateChannelDto): string;
    remove(id: number): string;
}
