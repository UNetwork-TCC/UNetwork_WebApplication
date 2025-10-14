import { Body, Controller, Get, Post } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { MessageRepository } from "@/lib/server/repositories";
import type { MessageDTO } from "@/types/dto";

@Controller
class MessageController extends BaseController {
  constructor(private messageRepository = new MessageRepository()) { super() }

  @Get
  async fetchMessages() { return await this.messageRepository.fetchAll()}

  @Post
  async createMessage(@Body() body: MessageDTO) { return await this.messageRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(MessageController);
