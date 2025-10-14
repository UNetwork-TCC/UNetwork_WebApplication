import type { IMessage } from "@/types";
import { Service } from "./Service";

class MessageService extends Service<IMessage> {
  constructor() { super('/message') }
  
  async getMessagesInChat(chatId: string) {
    return this.request(`${this.url}/getmessagesinchat/${chatId}`, 'GET')
  }
}

export const messageService = new MessageService();
