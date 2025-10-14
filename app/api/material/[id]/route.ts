import { Body, Controller, Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import type { IMaterial } from "@/types";
import { Material } from "@/lib/server/models";

@Controller
class MaterialController extends BaseController {
  constructor(private materialRepository = new BaseRepository<IMaterial>(Material)) { super() }

  @Get
  async getById(@Param('id') id: string) { return await this.materialRepository.findById(id) }

  @Patch
  async updateMaterial(@Param('id') id: string, @Body() body: Partial<IMaterial>) { return await this.materialRepository.update(id, body) }

  @Delete
  async deleteMaterial(@Param('id') id: string) { return await this.materialRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(MaterialController);