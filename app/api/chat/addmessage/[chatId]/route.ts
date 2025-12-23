import {
  Body,
  Controller,
  Param,
  Post as PostMethod
} from '@/lib/api-framework/decorators'
import { createNextRouteHandlers } from '@/lib/api-framework/funcs'
import { BaseController } from '@/lib/api-framework/models'
import { ChatRepository } from '@/lib/server/repositories'
import type { IMessage } from '@/types'

@Controller
class AddMessageController extends BaseController {
  constructor(private chatRepository = new ChatRepository()) {
    super()
  }

  @PostMethod
  async addMessage(
    @Param('chatId') chatId: string,
    @Body() body: { message: Partial<IMessage> }
  ) {
    const { message } = body

    if (!message || !message.content) {
      return { error: 'Mensagem inválida' }
    }

    return await this.chatRepository.addMessage(chatId, message)
  }
}

export const { POST } = createNextRouteHandlers(AddMessageController)
