import { Body, Controller, Get, Post } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import { Group } from "@/lib/server/models";
import type { GroupDTO } from "@/types/dto";
import type { IGroup } from "@/types";

@Controller
class GroupController extends BaseController {
  constructor(private groupRepository = new BaseRepository<IGroup>(Group)) { super() }

  @Get
  async fetchGroups() { return await this.groupRepository.fetchAll()}

  @Post
  async createGroup(@Body() body: GroupDTO) { return await this.groupRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(GroupController);
