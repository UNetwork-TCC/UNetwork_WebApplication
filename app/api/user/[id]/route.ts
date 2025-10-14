import { Body, Controller, Delete, Get, JwtAuth, Param, Patch } from "@/lib/api-framework/decorators";
import { getHttpHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { UserRepository } from "@/lib/server/repositories";
import { IUser } from "@/types";

@Controller
export class UserController extends BaseController {
    constructor(private userRepository = new UserRepository()) { super() }

    @Get
    @JwtAuth(['admin', 'user'])
    async getUserById(@Param('id') id: string) { return await this.userRepository.findById(id) }

    @Patch
    @JwtAuth(['admin', 'user'])
    async updateUser(@Body() body: Partial<IUser>, @Param('id') id: string) { return { id, body } }

    @Delete
    @JwtAuth(['admin', 'user'])
    async deleteUser(@Param('id') id: string) { return await this.userRepository.delete(id) }
}

export const { GET, PATCH, DELETE } = getHttpHandlers(UserController)
