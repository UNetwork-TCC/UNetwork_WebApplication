import type { IForum } from "@/types";
import { Service } from "./Service";

class ForumService extends Service<IForum> {
  constructor() { super('/forum') }
}

export const forumService = new ForumService();
