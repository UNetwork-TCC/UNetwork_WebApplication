import { BaseController } from "@/lib/api-framework/models";
import { BaseRepository } from "@/lib/server/repositories";
import { Forum } from "@/lib/server/models";
import { Body, Get, Post } from "@/lib/api-framework/decorators";
import { Controller } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import type { IForum } from "@/types";
import type { ForumDTO } from "@/types/dto";

@Controller
export class ForumController extends BaseController {
    constructor(private forumRepository = new BaseRepository<IForum>(Forum)) { super() }

    @Get
    async fetchForum() { return await this.forumRepository.fetchAll() }

    @Post
    async createForum(@Body() body: ForumDTO) { return await this.forumRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(ForumController);
