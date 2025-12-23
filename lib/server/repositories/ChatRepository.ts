import { Repository } from '@/lib/api-framework/database'
import { BaseRepository } from './BaseRepository'
import { IChat } from '@/types'
import { Chat } from '@/lib/server/models'

@Repository
export class ChatRepository extends BaseRepository<IChat> {
  constructor() {
    super(Chat)
  }

  async findUserChats(userId: string) {
    // Buscar todos os chats do usuário, ordenados pela última mensagem
    return await this.fetchAll(
      { users: { $in: [userId] } },
      { limit: 100, sort: { lastMessageAt: -1 } }
    )
  }

  async findChatBetweenUsers(userIds: string[]) {
    // Buscar chat existente entre os usuários (independente da ordem)
    return await this.entity.findOne({
      users: { $all: userIds, $size: userIds.length }
    }).lean()
  }

  async addMessage(chatId: string, message: any) {
    // Usar $push para adicionar mensagem ao array e atualizar lastMessageAt
    return await this.entity.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: message },
        $set: { lastMessageAt: new Date() }
      },
      { new: true }
    ).lean()
  }
}
