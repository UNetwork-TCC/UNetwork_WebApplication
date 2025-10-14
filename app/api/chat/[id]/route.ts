import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { ChatRepository } from "@/lib/server/repositories";
import type { IChat } from "@/types";

@Controller
class ChatByIdController extends BaseController {
  constructor(private chatRepository = new ChatRepository()) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.chatRepository.findById(id) }

  @Patch
  async updateChat(@Param('id') id: string, @Body() body: Partial<IChat>) { return await this.chatRepository.update(id, body) }

  @Delete
  async deleteChat(@Param('id') id: string) { return await this.chatRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(ChatByIdController);
