import { Repository } from "@/lib/api-framework/database";
import { BaseRepository } from "./BaseRepository";
import { IChat } from "@/types";
import { Chat } from "@/lib/server/models";

@Repository
export class ChatRepository extends BaseRepository<IChat> {
    constructor() { super(Chat) }

    async findUserChats(userId: string) {
        return await this.fetchAll({ users: { $in: [userId] } })
    }
}