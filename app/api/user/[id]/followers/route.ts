import { Get, Param, JwtAuth } from "@/lib/api-framework/decorators";
import extractHttpMethods from "@/lib/api-framework/funcs/getHttpHandlers";
import { BaseController } from "@/lib/api-framework/models";
import { UserRepository } from "@/lib/server/repositories";

class UserController extends BaseController {
    constructor(private userRepository: UserRepository) { super() }

    @Get
    @JwtAuth(['admin', 'user'])
    async getFollowers(@Param('id') id: string) { return this.userRepository.getFollowers(id) }
}

export const { GET } = extractHttpMethods(UserController)