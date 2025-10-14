import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import { News } from "@/lib/server/models";
import { Body, Get, Post } from "@/lib/api-framework/decorators";
import { Controller } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import type { INews } from "@/types";
import type { NewsDTO } from "@/types/dto";

@Controller
export class NewsController extends BaseController {
    constructor(private newsRepository = new BaseRepository<INews>(News)) { super() }

    @Get
    async fetchNews() { return await this.newsRepository.fetchAll() }

    @Post
    async createNews(@Body() body: NewsDTO) { return await this.newsRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(NewsController);
