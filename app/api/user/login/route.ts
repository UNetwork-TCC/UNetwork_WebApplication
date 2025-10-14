import { Body, Controller, Param, Post } from "@/lib/api-framework/decorators";
import { createNextRouteHandlers } from "@/lib/api-framework/funcs";
import { BaseController } from "@/lib/api-framework/models";
import { UserRepository } from "@/lib/server/repositories";
import type { UserDTO } from "@/types/dto";

@Controller
class UserController extends BaseController {
    constructor(private userRepository = new UserRepository()) { super() }

    @Post
    async login(@Body() body: UserDTO) {
        console.log(body)
        if (!body?.email || !body?.password) {
            throw new Error('Email e senha são obrigatórios');
        }
        
        const result = await this.userRepository.login(body.email, body.password);  
        if (!result?.data) {
            throw new Error('Credenciais inválidas');
        }
        
        return result;
    }
}


export const { POST } = createNextRouteHandlers(UserController);