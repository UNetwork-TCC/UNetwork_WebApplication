import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import type { IClass } from "@/types";
import { Class } from "@/lib/server/models";

@Controller
class ClassController extends BaseController {
  constructor(private classRepository = new BaseRepository<IClass>(Class)) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.classRepository.findById(id) }

  @Patch
  async updateClass(@Param('id') id: string, @Body() body: Partial<IClass>) { return await this.classRepository.update(id, body) }

  @Delete
  async deleteClass(@Param('id') id: string) { return await this.classRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(ClassController);
