import {
  Body,
  Controller,
  Get,
  Post as PostMethod
} from '@/lib/api-framework/decorators'
import { createNextRouteHandlers } from '@/lib/api-framework/funcs'
import { BaseController } from '@/lib/api-framework/models'
import { ChatRepository } from '@/lib/server/repositories'
import type { ChatDTO } from '@/types/dto'

@Controller
class ChatController extends BaseController {
  constructor(private chatRepository = new ChatRepository()) {
    super()
  }

  @Get
  async fetchChats() {
    return await this.chatRepository.fetchAll()
  }

  @PostMethod
  async createChat(@Body() body: ChatDTO) {
    // Verificar se já existe um chat entre esses usuários
    const existingChat = await this.chatRepository.findChatBetweenUsers(body.users)
    if (existingChat) {
      // Retornar o chat existente ao invés de criar duplicado
      return existingChat
    }
    return await this.chatRepository.create(body)
  }
}

export const { GET, POST } = createNextRouteHandlers(ChatController)
