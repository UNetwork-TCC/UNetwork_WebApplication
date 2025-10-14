import { Body, Controller, Get, Post } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import { Material } from "@/lib/server/models";
import type { MaterialDTO } from "@/types/dto";
import type { IMaterial } from "@/types";

@Controller
class MaterialController extends BaseController {
  constructor(private materialRepository = new BaseRepository<IMaterial>(Material)) { super() }

  @Get
  async fetchMaterials() { return await this.materialRepository.fetchAll()}

  @Post
  async createMaterial(@Body() body: MaterialDTO) { return await this.materialRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(MaterialController);
