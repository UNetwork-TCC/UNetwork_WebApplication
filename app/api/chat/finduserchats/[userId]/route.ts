import { Controller, Get, Param } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { ChatRepository } from "@/lib/server/repositories";
import type { IChat } from "@/types";

@Controller
class FindUserChatsController extends BaseController {
  constructor(private chatRepository = new ChatRepository()) { super() }

  @Get
  async findUserChats(@Param('userId') userId: string) {
    return await this.chatRepository.findUserChats(userId)
  }
}

export const { GET } = getHttpHandlers(FindUserChatsController);
