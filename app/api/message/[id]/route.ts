import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { MessageRepository } from "@/lib/server/repositories";
import type { MessageDTO } from "@/types/dto";

@Controller
class MessageController extends BaseController {
  constructor(private messageRepository = new MessageRepository()) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.messageRepository.findById(id) }

  @Patch
  async updateMessage(@Param('id') id: string, @Body() body: MessageDTO) { return await this.messageRepository.update(id, body) }

  @Delete
  async deleteMessage(@Param('id') id: string) { return await this.messageRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(MessageController);