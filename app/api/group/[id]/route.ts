import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import type { IGroup } from "@/types";
import { Group } from "@/lib/server/models";

@Controller
class GroupController extends BaseController {
  constructor(private groupRepository = new BaseRepository<IGroup>(Group)) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.groupRepository.findById(id) }

  @Patch
  async updateGroup(@Param('id') id: string, @Body() body: Partial<IGroup>) { return await this.groupRepository.update(id, body) }

  @Delete
  async deleteGroup(@Param('id') id: string) { return await this.groupRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(GroupController);
