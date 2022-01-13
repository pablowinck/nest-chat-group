import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    create(createChannelDto: CreateChannelDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChannelDto: UpdateChannelDto): string;
    remove(id: string): string;
}
