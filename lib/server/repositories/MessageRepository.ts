import { Repository } from '@/lib/api-framework/database'
import { BaseRepository } from './BaseRepository'
import { IMessage } from '@/types'
import { Message, Forum } from '@/lib/server/models'

@Repository
export class MessageRepository extends BaseRepository<IMessage> {
  constructor() {
    super(Message)
  }

  async getMessagesInChat(chatId: string) {
    return await this.fetchAll({ sendedIn: chatId })
  }

  async create<K = Partial<IMessage>>(data: K) {
    const message = await super.create(data)

    const messageData = data as Partial<IMessage>
    if (messageData.sendedIn) {
      await Forum.findByIdAndUpdate(messageData.sendedIn, {
        $push: { comments: message }
      })
    }

    return message
  }
}
