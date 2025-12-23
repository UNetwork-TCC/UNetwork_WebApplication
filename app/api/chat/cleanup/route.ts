import { Controller, Post as PostMethod } from '@/lib/api-framework/decorators'
import { createNextRouteHandlers } from '@/lib/api-framework/funcs'
import { BaseController } from '@/lib/api-framework/models'
import { Chat } from '@/lib/server/models'

@Controller
class CleanupChatsController extends BaseController {
  @PostMethod
  async cleanupNullMessages() {
    // Remover todos os elementos null dos arrays de mensagens
    const result = await Chat.updateMany(
      { messages: { $elemMatch: { $eq: null } } },
      { $pull: { messages: null } }
    )

    // Também remover mensagens sem content
    const result2 = await Chat.updateMany(
      { 'messages.content': { $exists: false } },
      { $pull: { messages: { content: { $exists: false } } } }
    )

    return {
      message: 'Limpeza concluída',
      chatsWithNulls: result.modifiedCount,
      chatsWithEmptyContent: result2.modifiedCount
    }
  }
}

export const { POST } = createNextRouteHandlers(CleanupChatsController)
