import { BaseController } from "@/lib/api-framework/models";
import type { INews } from "@/types";
import { Delete, Get, Param, Patch } from "@/lib/api-framework/decorators";
import { News } from "@/lib/server/models";
import { Body } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseRepository } from "@/lib/server/repositories";

class NewsController extends BaseController {
    constructor(private newsRepository = new BaseRepository<INews>(News)) { super() }

    @Get
    async getNewsById(@Param('id') id: string) { return await this.newsRepository.findById(id) }

    @Patch
    async updateNews(@Param('id') id: string, @Body() body: Partial<INews>) { return await this.newsRepository.update(id, body) }

    @Delete
    async deleteNews(@Param('id') id: string) { return await this.newsRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = createNextRouteHandlers(NewsController);
