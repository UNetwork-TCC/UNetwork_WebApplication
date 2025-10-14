import type { IPost } from "@/types";
import { Service } from "./Service";

class PostService extends Service<IPost> {
  constructor() { super('/post') }
}

export const postService = new PostService();
