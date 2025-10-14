import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import type { IPost } from "@/types";
import { Post } from "@/lib/server/models";

@Controller
class PostController extends BaseController {
  constructor(private postRepository = new BaseRepository<IPost>(Post)) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.postRepository.findById(id) }

  @Patch
  async updatePost(@Param('id') id: string, @Body() body: Partial<IPost>) { return await this.postRepository.update(id, body) }

  @Delete
  async deletePost(@Param('id') id: string) { return await this.postRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(PostController);
