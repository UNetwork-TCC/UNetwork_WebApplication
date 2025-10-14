import { Body, Controller, Get, Post as PostMethod } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import { Class } from "@/lib/server/models";
import type { IClass } from "@/types";
import type{ ClassDTO } from "@/types/dto";

@Controller
class ClassController extends BaseController {
  constructor(private classRepository = new BaseRepository<IClass>(Class)) { super() }

  @Get
  async fetchClasses() { return await this.classRepository.fetchAll() }

  @PostMethod
  async createClass(@Body() body: ClassDTO) { return await this.classRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(ClassController);
