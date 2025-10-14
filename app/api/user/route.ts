import { Controller, Get, Post, JwtAuth, Body } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { UserRepository } from "@/lib/server/repositories";
import type { UserDTO } from "@/types/dto";

@Controller
class UserController extends BaseController {
    constructor(private userRepository = new UserRepository()) { super() }

    @Get
    @JwtAuth(['admin'])
    async fetchUsers() { return this.userRepository.fetchAll() }

    @Post
    async createUser(@Body() body: UserDTO) { return this.userRepository.create(body) }
}

export const { GET, POST } = createNextRouteHandlers(UserController);