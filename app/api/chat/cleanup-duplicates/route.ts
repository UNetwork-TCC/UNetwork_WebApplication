import { Controller, Post as PostMethod } from '@/lib/api-framework/decorators'
import { createNextRouteHandlers } from '@/lib/api-framework/funcs'
import { BaseController } from '@/lib/api-framework/models'
import { Chat } from '@/lib/server/models'

@Controller
class CleanupDuplicateChatsController extends BaseController {
  @PostMethod
  async cleanupDuplicateChats() {
    // Buscar todos os chats
    const allChats = await Chat.find({}).lean()

    // Agrupar chats por par de usuários (ordenados para garantir consistência)
    const chatGroups: Record<string, typeof allChats> = {}

    for (const chat of allChats) {
      // Ordenar IDs dos usuários para criar uma chave consistente
      const userKey = [...chat.users].sort().join('_')

      if (!chatGroups[userKey]) {
        chatGroups[userKey] = []
      }
      chatGroups[userKey].push(chat)
    }

    // Encontrar grupos com duplicatas e decidir qual manter
    const chatsToDelete: string[] = []
    let duplicateGroupsFound = 0

    for (const [userKey, chats] of Object.entries(chatGroups)) {
      if (chats.length > 1) {
        duplicateGroupsFound++

        // Ordenar por: mais mensagens válidas primeiro, depois por data de criação mais recente
        const sorted = chats.sort((a, b) => {
          const aMessages = (a.messages || []).filter((m: any) => m && m.content).length
          const bMessages = (b.messages || []).filter((m: any) => m && m.content).length

          // Primeiro critério: mais mensagens
          if (bMessages !== aMessages) {
            return bMessages - aMessages
          }

          // Segundo critério: mais recente (pelo _id que contém timestamp)
          return b._id.toString().localeCompare(a._id.toString())
        })

        // Manter o primeiro (mais mensagens ou mais recente), deletar o resto
        for (let i = 1; i < sorted.length; i++) {
          chatsToDelete.push(sorted[i]._id.toString())
        }
      }
    }

    // Deletar os chats duplicados
    let deletedCount = 0
    if (chatsToDelete.length > 0) {
      const result = await Chat.deleteMany({ _id: { $in: chatsToDelete } })
      deletedCount = result.deletedCount
    }

    return {
      message: 'Limpeza de duplicatas concluída',
      duplicateGroupsFound,
      chatsDeleted: deletedCount,
      deletedChatIds: chatsToDelete
    }
  }
}

export const { POST } = createNextRouteHandlers(CleanupDuplicateChatsController)
