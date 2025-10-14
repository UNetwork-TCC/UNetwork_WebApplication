import { Body, Controller, Get, Post as PostMethod } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import { Post } from "@/lib/server/models";
import type { PostDTO } from "@/types/dto";
import type { IPost } from "@/types";

@Controller
class PostController extends BaseController {
  constructor(private postRepository = new BaseRepository<IPost>(Post)) { super() }

  @Get
  async fetchPosts() { return await this.postRepository.fetchAll()}

  @PostMethod
  async createPost(@Body() body: PostDTO) { return await this.postRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(PostController);
