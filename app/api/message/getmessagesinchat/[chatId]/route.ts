import { Controller, Get, Param } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { MessageRepository } from "@/lib/server/repositories";

@Controller
class MessagesInChatController extends BaseController {
  constructor(private messageRepository = new MessageRepository()) { super() }

  @Get
  async getMessagesInChat(@Param('chatId') chatId: string) { 
    return await this.messageRepository.getMessagesInChat(chatId)
  }
}

export const { GET } = getHttpHandlers(MessagesInChatController);
