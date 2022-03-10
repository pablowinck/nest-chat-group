import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";

@Controller("channels")
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.channelsService.findOne(+id);
  }

  @Post("/join")
  addMember(
    @Body() { channelId, userId }: { channelId: string; userId: string }
  ) {
    return this.channelsService.addMember(+channelId, +userId);
  }

  @Get("/:channelId/members")
  findAllMembers(@Param("channelId") channelId: string) {
    return this.channelsService.findAllMembers(+channelId);
  }

  @Get("/members/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.channelsService.findChannelsByUserId(+userId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.channelsService.remove(+id);
  }

  @Get("/all/:userId")
  findChannelsAndMessages(@Param("userId") userId: string) {
    return this.channelsService.findChannelsAndMessages(+userId);
  }
}
