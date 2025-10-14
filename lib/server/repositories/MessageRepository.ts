import { Repository } from "@/lib/api-framework/database";
import { BaseRepository } from "./BaseRepository";
import { IMessage } from "@/types";
import { Message } from "@/lib/server/models";

@Repository
export class MessageRepository extends BaseRepository<IMessage> {
    constructor() { super(Message) }

    async getMessagesInChat(chatId: string) { return await this.fetchAll({ sendedIn: chatId }) }
}