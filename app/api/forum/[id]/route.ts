import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import type { IForum } from "@/types";
import { Forum } from "@/lib/server/models";

@Controller
class ForumController extends BaseController {
  constructor(private forumRepository = new BaseRepository<IForum>(Forum)) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.forumRepository.findById(id) }

  @Patch
  async updateForum(@Param('id') id: string, @Body() body: Partial<IForum>) { return await this.forumRepository.update(id, body) }

  @Delete
  async deleteForum(@Param('id') id: string) { return await this.forumRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(ForumController);
