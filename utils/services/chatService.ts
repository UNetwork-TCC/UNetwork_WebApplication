import type { IChat } from "@/types";
import { Service } from "./Service";

class ChatService extends Service<IChat> {
  constructor() { super('/chat') }

  async findUserChats(userId: string) {
    return this.request(`${this.url}/finduserchats/${userId}`, 'GET')
  }
}

export const chatService = new ChatService();
